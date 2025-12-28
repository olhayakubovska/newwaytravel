import { CollectionConfig } from 'payload'
import { autoTranslate } from '../hooks/autoTranslate'

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
        if (data?.name && !data?.slug) {
          return {
            ...data,
            slug: data.name
              .toLowerCase()
              .trim()
              .replace(/[^\w\s-]/g, '')
              .replace(/[\s_-]+/g, '-'),
          }
        }
        return data
      },
    ],

    afterChange: [
      autoTranslate([
        'name',
        'location',
        'duration',
        'groupSize',
        'category',
        'uiTexts',
        'uiLabels',
        'consultationCard',
        'descriptionCard',
        'tripDetailsCard',
        'tripAdditionalInfoCard',
        'additionalInfoCard',
        'itinerary',
        'leader',
      ]),
    ],
  },

  fields: [
    // ===================== ОСНОВНЫЕ ПОЛЯ =====================
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

    // 🔥 КЛЮЧЕВОЕ ПОЛЕ ДЛЯ ПОИСКА ПО МЕСЯЦАМ
    {
      name: 'startDate',
      type: 'date',
      required: true,
      label: 'Дата початку туру',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'dd.MM.yyyy',
        },
      },
    },

    // ===================== ТАБЫ =====================
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
                {
                  name: 'leaderTitle',
                  type: 'text',
                  localized: true,
                  label: 'Заголовок турлідера',
                  defaultValue: 'Ваш турлідер',
                },
              ],
            },

            {
              name: 'consultationCard',
              type: 'group',
              label: 'Консультація',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  localized: true,
                  defaultValue: 'Тільки найяскравіші враження!',
                },
                {
                  name: 'text',
                  type: 'textarea',
                  localized: true,
                },
              ],
            },

            {
              name: 'descriptionCard',
              type: 'group',
              label: 'Опис туру',
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
              label: 'Деталі подорожі',
              fields: [
                {
                  name: 'bookingConditions',
                  type: 'richText',
                  localized: true,
                },
                {
                  name: 'bookingNote',
                  type: 'text',
                  localized: true,
                  defaultValue: '*Передоплата 50%',
                },
              ],
            },

            {
              name: 'tripAdditionalInfoCard',
              type: 'group',
              label: 'Що включено',
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
              label: 'Що не включено',
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

        // ---------- ТУРЛИДЕР ----------
        {
          label: 'Турлідер',
          fields: [
            {
              name: 'leader',
              type: 'group',
              label: 'Інформація про турлідера',
              fields: [
                { name: 'name', type: 'text', localized: true },
                { name: 'role', type: 'text', localized: true },
                { name: 'photo', type: 'upload', relationTo: 'media' },
                { name: 'bio', type: 'textarea', localized: true },
              ],
            },
          ],
        },
      ],
    },
  ],
}
