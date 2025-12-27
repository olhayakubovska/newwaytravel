import { CollectionConfig } from 'payload'

export const Orders: CollectionConfig = {
  slug: 'orders',

  // Змінюємо назви для інтерфейсу
  labels: {
    singular: 'Бронювання',
    plural: 'Бронювання турів',
  },

  admin: {
    group: 'Дані з форми',
    useAsTitle: 'name',
    defaultColumns: ['name', 'tourName', 'createdAt'],
    listSearchableFields: ['name', 'tourName'],
  },

  access: {
    create: () => true,
    read: ({ req: { user } }) => !!user,
  },

  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Ім’я клієнта',
    },
    {
      name: 'email',
      type: 'text',
      required: true,
      label: 'Email',
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
      label: 'Телефон',
    },
    {
      name: 'tourName',
      type: 'text',
      label: 'Назва туру',
      localized: true,
    },
    {
      name: 'guests',
      type: 'number',
      label: 'Кількість місць',
    },
  ],
}
