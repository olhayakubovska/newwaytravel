import { CollectionConfig } from 'payload'

export const Consultations: CollectionConfig = {
  slug: 'consultations',
  labels: {
    singular: 'Консультація',
    plural: 'Запити на консультацію',
  },
  admin: {
    group: 'Дані з форми',

    useAsTitle: 'name',
    defaultColumns: ['name', 'phone', 'createdAt'],
    // group: 'Заявки',
  },
  access: {
    create: () => true,
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: "Ім'я",
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Телефон',
    },
    {
      name: 'email',
      type: 'text',
      label: 'Email',
    },
    {
      name: 'message',
      type: 'textarea',
      label: 'Запитання',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'Новий', value: 'new' },
        { label: 'В роботі', value: 'processing' },
        { label: 'Завершено', value: 'completed' },
      ],
    },
  ],
  timestamps: true,
}
