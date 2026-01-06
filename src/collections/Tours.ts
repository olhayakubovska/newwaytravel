import { CollectionConfig } from 'payload'

export const Tours: CollectionConfig = {
  slug: 'tours',
  labels: {
    singular: 'Тур',
    plural: 'Всі тури',
  },

  admin: {
    group: 'Усі сторінки',
    useAsTitle: 'name',
    defaultColumns: ['name', 'startDate', 'category', 'location', 'price'],
    livePreview: {
      url: ({ data, locale }) => {
        const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
        const slug = data?.slug || ''
        const lang = locale?.code || 'uk'
        return `${baseUrl}/${lang}/tours/${slug}`
      },
    },
  },

  hooks: {
    beforeValidate: [
      ({ data }) => {
        const cleanData = (obj: any) => {
          if (Array.isArray(obj)) {
            obj.forEach(cleanData)
          } else if (obj !== null && typeof obj === 'object') {
            Object.keys(obj).forEach((key) => {
              if (/[а-яА-Я]/.test(key)) {
                console.log(`🧹 Видалено "привид": ${key}`)
                delete obj[key]
              } else {
                cleanData(obj[key])
              }
            })
          }
        }

        if (data) {
          cleanData(data)
        }

        if (data?.name && !data?.slug) {
          data.slug = data.name
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
        }

        return data
      },
    ],
  },

  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
      label: 'Назва туру',
      admin: {
        placeholder: 'Наприклад: Магія Ісландії',
      },
    },

    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { position: 'sidebar' },
    },

    {
      name: 'price',
      type: 'number',
      required: true,
      label: 'Ціна (€)',
      defaultValue: 1000,
    },

    {
      name: 'startDate',
      type: 'date',
      required: true,
      label: 'Дата початку туру для пошуку',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'dd.MM.yyyy',
        },
      },
    },

    {
      type: 'tabs',
      tabs: [
        // ---------- КОНТЕНТ ТУРА ----------
        {
          label: 'Контент туру',
          fields: [
            {
              name: 'uiTexts',
              type: 'group',
              label: 'Тексти кнопок',
              fields: [
                {
                  name: 'bookBtn',
                  type: 'text',
                  localized: true,
                  label: 'Кнопка забронювати',
                  defaultValue: 'Забронювати',
                },
                {
                  name: 'consultBtn',
                  type: 'text',
                  localized: true,
                  label: 'Кнопка консультація',
                  defaultValue: 'Консультація',
                },
              ],
            },

            {
              name: 'location',
              type: 'text',
              localized: true,
              label: 'Місце проведення',
              admin: { placeholder: 'Країна, місто' },
            },

            {
              name: 'duration',
              type: 'text',
              localized: true,
              label: 'Тривалість',
              admin: { placeholder: '7 днів / 6 ночей' },
            },

            {
              name: 'groupSize',
              type: 'text',
              localized: true,
              label: 'Розмір групи',
              admin: { placeholder: 'до 12 осіб' },
            },

            {
              name: 'category',
              type: 'text',
              localized: true,
              label: 'Категорія',
              admin: { placeholder: 'Експедиція' },
            },

            {
              name: 'mainImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Головне зображення',
            },

            {
              name: 'gallery',
              type: 'array',
              label: 'Галерея',
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                },
              ],
            },
          ],
        },

        // ---------- КАРТОЧКИ ТУРА ----------
        {
          label: 'Карточки туру',
          fields: [
            {
              name: 'uiLabels',
              type: 'group',
              label: 'Загальні заголовки секцій',
              fields: [
                {
                  name: 'itineraryTitle',
                  type: 'text',
                  localized: true,
                  label: 'Заголовок програми',
                  defaultValue: 'Програма туру',
                },
              ],
            },

            {
              name: 'tripAdditionalInfoCard',
              type: 'group',
              label: 'У ВАРТІСТЬ ВКЛЮЧЕНО',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  localized: true,
                },
                {
                  name: 'content',
                  type: 'richText',
                  localized: true,
                },
              ],
            },

            {
              name: 'additionalInfoCard',
              type: 'group',
              label: 'ДОДАТКОВО',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  localized: true,
                },
                {
                  name: 'content',
                  type: 'richText',
                  localized: true,
                },
              ],
            },

            {
              name: 'descriptionCard',
              type: 'group',
              label: 'Картка з кнопкою забронювати',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  localized: true,
                  defaultValue: 'Інформація про тур',
                },
                {
                  name: 'content',
                  type: 'richText',
                  localized: true,
                },
              ],
            },

            {
              name: 'tripDetailsCard',
              type: 'group',
              label: 'Картка з кнопкою консультація',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  localized: true,
                  defaultValue: 'Тільки найяскравіші враження',
                },
                {
                  name: 'bookingConditions',
                  type: 'richText',
                  localized: true,
                },
              ],
            },
          ],
        },

        // ---------- ПРОГРАММА ----------
        {
          label: 'Програма',
          fields: [
            {
              name: 'itinerary',
              type: 'array',
              label: 'Програма по днях',
              fields: [
                {
                  name: 'dayTitle',
                  type: 'text',
                  localized: true,
                },
                {
                  name: 'content',
                  type: 'richText',
                  localized: true,
                },
                {
                  name: 'images',
                  type: 'array',
                  fields: [
                    {
                      name: 'image',
                      type: 'upload',
                      relationTo: 'media',
                    },
                  ],
                },
              ],
            },
          ],
        },

        // ---------- ТУРЛІДЕР ----------
        {
          label: 'Турлідер',
          fields: [
            {
              name: 'leaderTitle',
              type: 'text',
              localized: true,
              label: 'Заголовок секції турлідера',
              defaultValue: 'Ваш турлідер',
              admin: {
                description: 'Цей текст буде відображатися як заголовок над карткою лідера',
              },
            },
            {
              name: 'leader',
              type: 'group',
              label: 'Інформація про турлідера',
              fields: [
                { name: 'name', type: 'text', localized: true, label: "Ім'я" },
                { name: 'role', type: 'text', localized: true, label: 'Роль/Посада' },
                { name: 'photo', type: 'upload', relationTo: 'media', label: 'Фото' },
                { name: 'bio', type: 'textarea', localized: true, label: 'Біографія' },
              ],
            },
          ],
        },
      ],
    },
  ],
}
