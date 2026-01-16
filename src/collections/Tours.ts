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
    defaultColumns: ['name', 'category', 'location', 'price'],
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
      admin: { placeholder: 'Наприклад: Магія Ісландії' },
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
      label: 'Технічна дата початку (для сортування)',
      admin: {
        date: { pickerAppearance: 'dayOnly', displayFormat: 'dd.MM.yyyy' },
      },
    },
    {
      type: 'tabs',
      tabs: [
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
              name: 'category',
              type: 'text',
              localized: true,
              label: 'Категорія',
              admin: { placeholder: 'Експедиція' },
            },

            {
              name: 'shortDescription',
              type: 'textarea',
              localized: true,
              label: 'Короткий опис для картки',
            },
            {
              name: 'duration',
              type: 'number',
              label: 'Кількість днів',
              required: true,
            },
            {
              name: 'tourDates',
              type: 'array',
              label: 'Доступні дати',
              labels: { singular: 'Дата', plural: 'Дати' },
              fields: [
                {
                  name: 'dateRange',
                  type: 'text',
                  localized: true,
                  label: 'Період (напр. 16.03.2026 - 18.03.2026)',
                },
                { name: 'isFull', type: 'checkbox', label: 'Група набрана', defaultValue: false },
              ],
            },
            {
              name: 'groupSize',
              type: 'text',
              localized: true,
              label: 'Розмір групи',
              admin: { placeholder: 'до 12 осіб' },
            },
            { name: 'mainImage', type: 'upload', relationTo: 'media', label: 'Головне зображення' },
            {
              name: 'gallery',
              type: 'array',
              label: 'Галерея',
              fields: [{ name: 'image', type: 'upload', relationTo: 'media' }],
            },
          ],
        },
        {
          label: 'Карточки туру',
          fields: [
            {
              name: 'tripAdditionalInfoCard',
              type: 'group',
              label: 'У ВАРТІСТЬ ВКЛЮЧЕНО',
              fields: [
                { name: 'title', type: 'text', localized: true, label: 'Заголовок' },
                { name: 'content', type: 'richText', localized: true, label: 'Контент' },
              ],
            },
            {
              name: 'additionalInfoCard',
              type: 'group',
              label: 'ДОДАТКОВО',
              fields: [
                { name: 'title', type: 'text', localized: true, label: 'Заголовок' },
                { name: 'content', type: 'richText', localized: true, label: 'Контент' },
              ],
            },
            {
              name: 'optionalInfoCard',
              type: 'group',
              label: 'ЗА БАЖАННЯМ',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  localized: true,
                  label: 'Заголовок',
                  defaultValue: 'За бажанням',
                },
                {
                  name: 'content',
                  type: 'richText',
                  localized: true,
                  label: 'Контент (список послуг)',
                },
              ],
            },
            {
              name: 'bookingDetailsCard',
              type: 'group',
              label: 'КАРТКА БРОНЮВАННЯ (З розстрочкою)',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  localized: true,
                  label: 'Головний заголовок',
                  defaultValue: 'БРОНЬ ТУРА*',
                },
                {
                  name: 'prepayment',
                  type: 'text',
                  localized: true,
                  label: 'Сума авансу',
                  admin: { placeholder: 'Аванс – 50% / Людина' },
                },
                {
                  name: 'installmentTitle',
                  type: 'text',
                  localized: true,
                  label: 'Заголовок блоку розстрочки',
                  defaultValue: 'РОЗСТРОЧКА',
                },
                {
                  name: 'installmentList',
                  type: 'array',
                  label: 'Пункти розстрочки',
                  labels: { singular: 'Пункт', plural: 'Пункти' },
                  fields: [
                    {
                      name: 'text',
                      type: 'text',
                      localized: true,
                      label: 'Текст пункту',
                    },
                  ],
                },
                {
                  name: 'note',
                  type: 'textarea',
                  localized: true,
                  label: 'Примітка внизу',
                  admin: { placeholder: '*Предоплата не повертається...' },
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
                { name: 'bookingConditions', type: 'richText', localized: true },
              ],
            },
          ],
        },
        {
          label: 'Програма та Карта',
          fields: [
            {
              name: 'mapType',
              type: 'select',
              label: 'Тип карти',
              defaultValue: 'iframe',
              options: [
                { label: 'Google Maps Iframe', value: 'iframe' },
                { label: 'Посилання', value: 'link' },
              ],
            },
            {
              name: 'mapIframe',
              type: 'textarea',
              label: 'Код Iframe',
              admin: {
                condition: (data, siblingData) => siblingData.mapType === 'iframe',
              },
            },
            {
              name: 'itinerary',
              type: 'array',
              label: 'Програма по днях',
              fields: [
                { name: 'dayTitle', type: 'text', localized: true },
                { name: 'content', type: 'richText', localized: true },
                {
                  name: 'images',
                  type: 'array',
                  fields: [{ name: 'image', type: 'upload', relationTo: 'media' }],
                },
              ],
            },
          ],
        },
        {
          label: 'Турлідер',
          fields: [
            {
              name: 'leaderTitle',
              type: 'text',
              localized: true,
              label: 'Заголовок секції',
              defaultValue: 'Ваш турлідер',
            },
            {
              name: 'leader',
              type: 'group',
              label: 'Інформація',
              fields: [
                { name: 'name', type: 'text', localized: true, label: "Ім'я" },
                { name: 'role', type: 'text', localized: true, label: 'Роль' },
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
