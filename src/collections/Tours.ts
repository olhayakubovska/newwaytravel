// import { autoTranslate } from '../hooks/autoTranslate'
// import { CollectionConfig } from 'payload'

// export const Tours: CollectionConfig = {
//   slug: 'tours',
//   admin: {
//     useAsTitle: 'name',
//     defaultColumns: ['name', 'category', 'location', 'price'],
//   },
//   access: {
//     read: () => true,
//   },
//   hooks: {
//     afterChange: [autoTranslate(['name', 'description', 'location', 'duration', 'groupSize'])],
//   },
//   fields: [
//     {
//       name: 'name',
//       type: 'text',
//       required: true,
//       label: 'Назва туру',
//       localized: true,
//     },
//     {
//       name: 'slug',
//       type: 'text',
//       required: true,
//       unique: true,
//       localized: false,
//       admin: {
//         position: 'sidebar',
//         description: 'Технічне имя для URL (наприклад: carpathian-tour)',
//       },
//     },
//     {
//       name: 'category',
//       type: 'select',
//       required: true,
//       localized: false,
//       label: 'Категорія',
//       options: [
//         { label: 'Холодні країни', value: 'cold-countries' },
//         { label: 'Острови', value: 'islands' },
//         { label: 'Спекотні країни', value: 'hot-countries' },
//         { label: 'Екстремальні тури', value: 'extreme' },
//         { label: 'Нейтральний клімат', value: 'neutral' },
//         { label: 'Трейлери', value: 'trailers' },
//         { label: 'Дика природа', value: 'wildlife' },
//         { label: 'Круїз', value: 'cruise' },
//       ],
//     },
//     {
//       name: 'location',
//       type: 'text',
//       required: true,
//       label: 'Напрямок (Країна/Регіон)',
//       localized: true,
//     },
//     {
//       name: 'month',
//       type: 'select',
//       localized: false,
//       label: 'Місяць',
//       options: [
//         { label: 'Січень', value: 'jan' },
//         { label: 'Лютий', value: 'feb' },
//         { label: 'Березень', value: 'mar' },
//         { label: 'Квітень', value: 'apr' },
//         { label: 'Травень', value: 'may' },
//         { label: 'Червень', value: 'jun' },
//         { label: 'Липень', value: 'jul' },
//         { label: 'Серпень', value: 'aug' },
//         { label: 'Вересень', value: 'sep' },
//         { label: 'Жовтень', value: 'oct' },
//         { label: 'Листопад', value: 'nov' },
//         { label: 'Грудень', value: 'dec' },
//       ],
//     },
//     {
//       name: 'price',
//       type: 'number',
//       required: true,
//       label: 'Ціна (€)',
//       admin: {
//         description: 'Вкажіть числове значение ціни',
//       },
//     },
//     {
//       name: 'duration',
//       type: 'text',
//       label: 'Тривалість',
//       localized: true,
//     },
//     {
//       name: 'groupSize',
//       type: 'text',
//       label: 'Розмір групи',
//       localized: true,
//     },
//     {
//       name: 'description',
//       type: 'textarea',
//       label: 'Опис',
//       localized: true,
//     },
//     {
//       name: 'mainImage',
//       type: 'upload',
//       relationTo: 'media',
//       required: true,
//       label: 'Головне фото',
//     },
//   ],
// }
import { autoTranslate } from '../hooks/autoTranslate'
import { CollectionConfig } from 'payload'

export const Tours: CollectionConfig = {
  slug: 'tours',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'location', 'price'],
  },
  access: {
    read: () => true,
  },
  hooks: {
    // Добавили 'category' в список полей для автоперевода
    afterChange: [
      autoTranslate(['name', 'description', 'location', 'duration', 'groupSize', 'category']),
    ],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Назва туру',
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      localized: false,
      admin: {
        position: 'sidebar',
        description: 'Технічне имя для URL (наприклад: carpathian-tour)',
      },
    },
    {
      // ИЗМЕНЕНО: Теперь это текстовое поле, а не селект
      name: 'category',
      type: 'text',
      required: true,
      localized: true, // Включаем локализацию, чтобы админ писал на разных языках
      label: 'Категорія',
      admin: {
        description: 'Введіть назву категорії (наприклад: Експедиція, Релакс і т.д.)',
      },
    },
    {
      name: 'location',
      type: 'text',
      required: true,
      label: 'Напрямок (Країна/Регіон)',
      localized: true,
    },
    {
      name: 'month',
      type: 'select',
      localized: false,
      label: 'Місяць',
      options: [
        { label: 'Січень', value: 'jan' },
        { label: 'Лютий', value: 'feb' },
        { label: 'Березень', value: 'mar' },
        { label: 'Квітень', value: 'apr' },
        { label: 'Травень', value: 'may' },
        { label: 'Червень', value: 'jun' },
        { label: 'Липень', value: 'jul' },
        { label: 'Серпень', value: 'aug' },
        { label: 'Вересень', value: 'sep' },
        { label: 'Жовтень', value: 'oct' },
        { label: 'Листопад', value: 'nov' },
        { label: 'Грудень', value: 'dec' },
      ],
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      label: 'Ціна (€)',
    },
    {
      name: 'duration',
      type: 'text',
      label: 'Тривалість',
      localized: true,
    },
    {
      name: 'groupSize',
      type: 'text',
      label: 'Розмір групи',
      localized: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Опис',
      localized: true,
    },
    {
      name: 'mainImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Головне фото',
    },
  ],
}
