// src/globals/About.ts
import { GlobalConfig } from 'payload'

export const AboutConfig: GlobalConfig = {
  slug: 'about',
  label: 'Про нас',
  access: { read: () => true },
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
