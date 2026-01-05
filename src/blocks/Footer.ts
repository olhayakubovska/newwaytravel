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
      label: 'Описание компании (Левая колонка)',
      localized: true,
    },

    {
      type: 'collapsible',
      label: 'Колонка: Навигация (Меню)',
      admin: { initCollapsed: false },
      fields: [
        {
          name: 'menuTitle',
          type: 'text',
          label: 'Заголовок секции меню',
          localized: true,
          admin: { placeholder: 'Меню' },
        },
        {
          name: 'navItems',
          type: 'array',
          label: 'Ссылки меню',
          labels: { singular: 'Ссылка', plural: 'Ссылки' },
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'label', type: 'text', label: 'Текст', localized: true, required: true },
                { name: 'link', type: 'text', label: 'URL', required: true },
              ],
            },
          ],
        },
      ],
    },

    {
      type: 'collapsible',
      label: 'Колонка: Контакты',
      admin: { initCollapsed: false },
      fields: [
        {
          name: 'contactTitle',
          type: 'text',
          label: 'Заголовок секции контактов',
          localized: true,
          admin: { placeholder: "Зворотній зв'язок" },
        },
        {
          type: 'row',
          fields: [
            { name: 'phone', type: 'text', label: 'Телефон', admin: { width: '50%' } },
            { name: 'email', type: 'text', label: 'Email', admin: { width: '50%' } },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'address',
              type: 'text',
              label: 'Адрес',
              localized: true,
              admin: { width: '50%' },
            },
            {
              name: 'hours',
              type: 'text',
              label: 'Часы работы',
              localized: true,
              admin: { width: '50%' },
            },
          ],
        },
      ],
    },

    {
      type: 'collapsible',
      label: 'Колонка: Соцсети',
      admin: { initCollapsed: false },
      fields: [
        {
          name: 'socialTitle',
          type: 'text',
          label: 'Заголовок секции соцсетей',
          localized: true,
          admin: { placeholder: 'Соціальні мережи' },
        },
        {
          name: 'socials',
          type: 'group',
          label: 'Ссылки на профили',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'facebook', type: 'text', label: 'Facebook' },
                { name: 'instagram', type: 'text', label: 'Instagram' },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'telegram', type: 'text', label: 'Telegram' },
                { name: 'youtube', type: 'text', label: 'YouTube' },
              ],
            },
          ],
        },
      ],
    },

    {
      name: 'copyrightText',
      type: 'text',
      label: 'Текст копирайта (самый низ)',
      localized: true,
      admin: {
        placeholder: 'Всі права захищені.',
        position: 'sidebar',
      },
    },
  ],
}
