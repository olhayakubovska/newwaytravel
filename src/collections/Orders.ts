import { CollectionConfig } from 'payload'

export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'tourName', 'createdAt'],
  },
  access: {
    create: () => true, // Позволяем любому пользователю отправить заявку
    read: ({ req: { user } }) => !!user, // Только админ видит список
  },
  fields: [
    { name: 'name', type: 'text', required: true, label: 'Ім’я' },
    { name: 'email', type: 'text', required: true },
    { name: 'phone', type: 'text', required: true, label: 'Телефон' },
    { name: 'tourName', type: 'text', label: 'Назва туру' },
    { name: 'guests', type: 'number', label: 'Кількість місць' },
  ],
}
