import { CollectionConfig } from 'payload'

export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
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
      label: 'Ім’я',
    },
    { name: 'email', type: 'text', required: true },
    { name: 'phone', type: 'text', required: true, label: 'Телефон' },
    {
      name: 'tourName',
      type: 'text',
      label: 'Назва туру',
      localized: true,
    },
    { name: 'guests', type: 'number', label: 'Кількість місць' },
  ],
}
