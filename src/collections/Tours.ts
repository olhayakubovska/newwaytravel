import { autoTranslate } from '../hooks/autoTranslate'
import { CollectionConfig } from 'payload'

export const Tours: CollectionConfig = {
  slug: 'tours',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'location', 'price'],
    livePreview: {
      url: ({ data, locale }) => {
        const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
        // Динамическая ссылка: учитывает язык и слаг тура
        return `${baseUrl}/${locale.code}/tours/${data?.slug || ''}`
      },
    },
  },
  access: { read: () => true },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        // Авто-генерация слага, чтобы избежать undefined в URL
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
        'description',
        'location',
        'duration',
        'groupSize',
        'category',
        'itinerary',
        'tripDetails',
        'leaders',
        'uiTexts',
      ]),
    ],
  },
  fields: [
    { name: 'name', type: 'text', required: true, localized: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { position: 'sidebar' },
      label: 'URL Slug',
    },
    { name: 'price', type: 'number', required: true, label: 'Ціна (€)' },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Контент туру',
          fields: [
            {
              name: 'uiTexts',
              type: 'group',
              label: 'Тексти кнопок та заголовків',
              fields: [
                { name: 'bookButton', type: 'text', localized: true, defaultValue: 'Забронювати' },
                {
                  name: 'consultButton',
                  type: 'text',
                  localized: true,
                  defaultValue: 'Консультація',
                },
                {
                  name: 'programTitle',
                  type: 'text',
                  localized: true,
                  defaultValue: 'Програма туру',
                },
                { name: 'leaderTitle', type: 'text', localized: true, defaultValue: 'Турлідер' },
                {
                  name: 'consultCardTitle',
                  type: 'text',
                  localized: true,
                  defaultValue: 'Тільки найяскравіші враження!',
                },
                {
                  name: 'consultCardText',
                  type: 'text',
                  localized: true,
                  defaultValue: 'Ми відкриті до пропозицій.',
                },
              ],
            },
            {
              name: 'tripDetails',
              type: 'group',
              fields: [
                { name: 'dates', type: 'text', localized: true },
                { name: 'priceLabel', type: 'text', localized: true },
                { name: 'bookingConditions', type: 'richText', localized: true },
                { name: 'bookingNote', type: 'text', localized: true },
                { name: 'additionalInfo', type: 'richText', localized: true },
              ],
            },
            { name: 'location', type: 'text', localized: true },
            { name: 'duration', type: 'text', localized: true },
            { name: 'category', type: 'text', localized: true },
            { name: 'description', type: 'richText', localized: true },
            { name: 'mainImage', type: 'upload', relationTo: 'media' },
            {
              name: 'gallery',
              type: 'array',
              fields: [{ name: 'image', type: 'upload', relationTo: 'media' }],
            },
          ],
        },
        {
          label: 'Програма',
          fields: [
            {
              name: 'itinerary',
              type: 'array',
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
          name: 'leader',

          label: 'Турлідер',
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
}
