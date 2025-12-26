import { GlobalConfig } from 'payload'

export const AboutConfig: GlobalConfig = {
  slug: 'about',
  label: 'About',
  access: { read: () => true },
  admin: {
    // Этот блок добавит кнопку предпросмотра (глазик)
    livePreview: {
      url: ({ locale }) => {
        const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
        return `${baseUrl}/${locale.code}/about`
      },
    },
  },
  fields: [
    { name: 'title', type: 'text', localized: true, required: true },
    { name: 'historyTitle', type: 'text', localized: true },
    { name: 'historyContent', type: 'richText', localized: true },
    {
      name: 'features',
      type: 'array',
      localized: true,
      fields: [
        { name: 'label', type: 'text' },
        { name: 'value', type: 'textarea' },
      ],
    },
    {
      name: 'mainImages',
      type: 'array',
      fields: [{ name: 'image', type: 'upload', relationTo: 'media' }],
    },
  ],
}
