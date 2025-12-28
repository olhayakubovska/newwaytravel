import * as translate from 'google-translate-api-next'

async function translateObject(obj: any, to: string): Promise<any> {
  if (Array.isArray(obj)) {
    return Promise.all(obj.map((item) => translateObject(item, to)))
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
          const res = await translate.default(value, { to })
          newObj[key] = res.text
        } catch {
          newObj[key] = value
        }
      } else {
        newObj[key] = await translateObject(value, to)
      }
    }
    return newObj
  }
  return obj
}

const allLocales = ['uk', 'en', 'ru'] // все поддерживаемые локали

export const autoTranslate =
  (fields: string[]) =>
  async ({ doc, req, collection }: any) => {
    const sourceLocale = req.locale
    if (!sourceLocale || req.context?.internal) return doc

    for (const targetLocale of allLocales) {
      if (targetLocale === sourceLocale) continue

      const translations: any = {}

      if (doc.slug) translations.slug = doc.slug
      if (doc.category) translations.category = doc.category
      if (doc.month) translations.month = doc.month

      for (const field of fields) {
        const value = doc[field]
        if (!value || field === 'slug' || field === 'category' || field === 'month') continue

        try {
          if (typeof value === 'string' && value.length > 0) {
            const res = await translate.default(value, { to: targetLocale })
            translations[field] = res.text
          } else if (Array.isArray(value)) {
            translations[field] = await translateObject(value, targetLocale)
          }
        } catch (e) {
          console.error(`Ошибка перевода поля ${field} в ${targetLocale}:`, e)
        }
      }

      if (Object.keys(translations).length > 0) {
        setTimeout(async () => {
          try {
            console.log(`🚀 Отправка перевода в базу для ${targetLocale}...`)
            await req.payload.update({
              collection: collection.slug,
              id: doc.id,
              locale: targetLocale,
              data: translations,
              context: { internal: true },
            })
            console.log(`✅ Данные успешно переведены и синхронизированы для ${targetLocale}!`)
          } catch (err) {
            console.error('❌ Ошибка записи:', err)
          }
        }, 300)
      }
    }

    return doc
  }
