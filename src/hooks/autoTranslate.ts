import * as translate from 'google-translate-api-next'

async function translateObject(obj: any): Promise<any> {
  if (Array.isArray(obj)) {
    return Promise.all(obj.map((item) => translateObject(item)))
  } else if (obj !== null && typeof obj === 'object') {
    const newObj: any = {}
    for (const [key, value] of Object.entries(obj)) {
      if (
        typeof value === 'string' &&
        value.length > 1 &&
        key !== 'id' &&
        key !== 'blockType' &&
        key !== 'relationTo'
      ) {
        try {
          const res = await translate.default(value, { to: 'en' })
          newObj[key] = res.text
        } catch {
          newObj[key] = value
        }
      } else {
        newObj[key] = await translateObject(value)
      }
    }
    return newObj
  }
  return obj
}

export const autoTranslate =
  (fields: string[]) =>
  async ({ doc, req, collection }: any) => {
    if (req.locale === 'uk' && !req.context?.internal) {
      const translations: any = {}

      // 1. Обязательно копируем slug
      if (doc.slug) translations.slug = doc.slug

      // 2. ВАЖНО: Копируем значения селектов, чтобы не было ValidationError
      // Это решит проблему с "Категорія" и "Місяць"
      if (doc.category) translations.category = doc.category
      if (doc.month) translations.month = doc.month

      for (const field of fields) {
        const value = doc[field]
        if (!value || field === 'slug' || field === 'category' || field === 'month') continue

        try {
          if (typeof value === 'string' && value.length > 0) {
            const res = await translate.default(value, { to: 'en' })
            translations[field] = res.text
          } else if (Array.isArray(value)) {
            translations[field] = await translateObject(value)
          }
        } catch (e) {
          console.error(`Ошибка перевода поля ${field}:`, e)
        }
      }

      if (Object.keys(translations).length > 0) {
        setTimeout(async () => {
          try {
            console.log('🚀 Отправка перевода в базу для EN...')
            await req.payload.update({
              collection: collection.slug,
              id: doc.id,
              locale: 'en',
              data: translations,
              context: { internal: true },
            })
            console.log(`✅ Данные успешно переведены и синхронизированы для EN!`)
          } catch (err) {
            console.error('❌ Ошибка записи:', err)
          }
        }, 300) // Увеличил до 300мс для стабильности
      }
    }
    return doc
  }
