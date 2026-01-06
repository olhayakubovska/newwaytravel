import * as translate from 'google-translate-api-next'

/**
 * Рекурсивная функция для перевода объектов и массивов.
 * Теперь она игнорирует системные поля и ключи на кириллице.
 */
async function translateObject(obj: any, to: string): Promise<any> {
  if (Array.isArray(obj)) {
    return Promise.all(obj.map((item) => translateObject(item, to)))
  } else if (obj !== null && typeof obj === 'object') {
    const newObj: any = {}
    for (const [key, value] of Object.entries(obj)) {
      // 1. ИГНОРИРУЕМ системные поля Payload
      // 2. ИГНОРИРУЕМ ключи с кириллицей (защита от ошибки "посилання")
      if (
        key === 'id' ||
        key === 'blockType' ||
        key === 'relationTo' ||
        key === 'updatedAt' ||
        key === 'createdAt' ||
        /[а-яА-Я]/.test(key)
      ) {
        newObj[key] = value
        continue
      }

      if (typeof value === 'string' && value.length > 1) {
        try {
          const res = await translate.default(value, { to })
          newObj[key] = res.text
        } catch {
          newObj[key] = value
        }
      } else if (typeof value === 'object' && value !== null) {
        newObj[key] = await translateObject(value, to)
      } else {
        newObj[key] = value
      }
    }
    return newObj
  }
  return obj
}

const allLocales = ['uk', 'en', 'ru']

export const autoTranslate =
  (fields: string[]) =>
  async ({ doc, req, collection }: any) => {
    const sourceLocale = req.locale
    // Проверка на internal context критически важна, чтобы не было бесконечного цикла
    if (!sourceLocale || req.context?.internal) return doc

    for (const targetLocale of allLocales) {
      if (targetLocale === sourceLocale) continue

      const translations: any = {}

      /**
       * Безопасное копирование системных полей, которые НЕ локализованы,
       * но нужны для целостности документа (slug, category и т.д.)
       */
      const syncFields = ['slug', 'category', 'month']
      syncFields.forEach((f) => {
        if (doc[f] && typeof doc[f] !== 'object') {
          translations[f] = doc[f]
        }
      })

      // Переводим только те поля, которые были явно переданы в аргументах хука
      for (const field of fields) {
        const value = doc[field]

        // Пропускаем, если поля нет или оно уже в списке синхронизации
        if (!value || syncFields.includes(field)) continue

        try {
          if (typeof value === 'string' && value.length > 0) {
            const res = await translate.default(value, { to: targetLocale })
            translations[field] = res.text
          } else if (Array.isArray(value) || typeof value === 'object') {
            translations[field] = await translateObject(value, targetLocale)
          }
        } catch (e) {
          console.error(`❌ Ошибка перевода поля "${field}" в локаль "${targetLocale}":`, e)
        }
      }

      // Отправляем обновление в базу только если есть что переводить
      if (Object.keys(translations).length > 0) {
        setTimeout(async () => {
          try {
            console.log(`🚀 [${collection.slug}] Перевод для "${targetLocale}"...`)
            await req.payload.update({
              collection: collection.slug,
              id: doc.id,
              locale: targetLocale,
              data: translations,
              context: { internal: true }, // Помечаем как внутренний запрос
            })
          } catch (err) {
            // Если здесь вылетает ошибка "invalid field", значит мусор попал в объект translations
            console.error(`❌ Ошибка сохранения перевода [${targetLocale}]:`, err)
          }
        }, 300)
      }
    }

    return doc
  }
