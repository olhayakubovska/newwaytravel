import { GlobalConfig } from 'payload'

export const AboutConfig: GlobalConfig = {
  slug: 'about',
  label: 'Про нас',
  access: { read: () => true },
  admin: {
    group: 'Усі сторінки',

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

    /* 🔥 TEAM SECTION */
    {
      name: 'team',
      label: 'Team members',
      type: 'array',
      fields: [
        {
          name: 'photo',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'role',
          type: 'text',
          localized: true,
        },
        {
          name: 'bio',
          type: 'textarea',
          localized: true,
        },
      ],
    },
  ],
}
