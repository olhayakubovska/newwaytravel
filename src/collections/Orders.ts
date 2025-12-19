// import { CollectionConfig } from 'payload'

// export const Orders: CollectionConfig = {
//   slug: 'orders',
//   admin: {
//     useAsTitle: 'name',
//     defaultColumns: ['name', 'tourName', 'createdAt'],
//   },
//   access: {
//     create: () => true, // Позволяем любому пользователю отправить заявку
//     read: ({ req: { user } }) => !!user, // Только админ видит список
//   },
//   fields: [
//     { name: 'name', type: 'text', required: true, label: 'Ім’я' },
//     { name: 'email', type: 'text', required: true },
//     { name: 'phone', type: 'text', required: true, label: 'Телефон' },
//     { name: 'tourName', type: 'text', label: 'Назва туру' },
//     { name: 'guests', type: 'number', label: 'Кількість місць' },
//   ],
// }
// Для коллекции Orders (Заказы) ситуация немного отличается. Обычно данные в заказах
//  (имя клиента, телефон, название выбранного тура) не локализуют, так как это фактические данные,
// которые приходят от пользователя в том виде, в котором он их заполнил.

// Однако, если вы хотите, чтобы кнопка переключения языков была активна и здесь,
//  или если вы планируете хранить название тура на разных языках для админа, вот обновленный код:
import { CollectionConfig } from 'payload'

export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'tourName', 'createdAt'],
    // Активирует переключатель в списке заказов
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
      // localized: false (Имя клиента всегда остается как есть)
    },
    { name: 'email', type: 'text', required: true },
    { name: 'phone', type: 'text', required: true, label: 'Телефон' },
    {
      name: 'tourName',
      type: 'text',
      label: 'Назва туру',
      localized: true, // Позволит админу видеть название на выбранном языке
    },
    { name: 'guests', type: 'number', label: 'Кількість місць' },
  ],
}
