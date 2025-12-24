import { GlobalConfig } from 'payload'

export const FooterConfig: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'description',
      type: 'textarea',
      label: 'Описание компании',
    },
    {
      type: 'row',
      fields: [
        { name: 'phone', type: 'text', label: 'Телефон' },
        { name: 'email', type: 'text', label: 'Email' },
      ],
    },
    { name: 'address', type: 'text', label: 'Адрес' },
    { name: 'hours', type: 'text', label: 'Часы работы' },
    {
      name: 'socials',
      type: 'group',
      label: 'Социальные сети',
      fields: [
        { name: 'facebook', type: 'text', label: 'Facebook URL' },
        { name: 'youtube', type: 'text', label: 'YouTube URL' },
        { name: 'instagram', type: 'text', label: 'Instagram URL' },
      ],
    },
  ],
}
