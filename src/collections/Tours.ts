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
//     // Добавили 'category' в список полей для автоперевода
//     afterChange: [
//       autoTranslate(['name', 'description', 'location', 'duration', 'groupSize', 'category']),
//     ],
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
//       // ИЗМЕНЕНО: Теперь это текстовое поле, а не селект
//       name: 'category',
//       type: 'text',
//       required: true,
//       localized: true, // Включаем локализацию, чтобы админ писал на разных языках
//       label: 'Категорія',
//       admin: {
//         description: 'Введіть назву категорії (наприклад: Експедиція, Релакс і т.д.)',
//       },
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
    // Не забудьте добавить новые поля в автоперевод, если ваш хук это поддерживает
    afterChange: [
      autoTranslate([
        'name',
        'description',
        'location',
        'duration',
        'groupSize',
        'category',
        'itinerary',
      ]),
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
      admin: { position: 'sidebar' },
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      label: 'Ціна (€)',
    },
    {
      type: 'tabs', // Организуем поля по вкладкам для удобства админа
      tabs: [
        {
          label: 'Основна інформація',
          fields: [
            {
              name: 'category',
              type: 'text',
              localized: true,
              label: 'Категорія',
            },
            {
              name: 'location',
              type: 'text',
              localized: true,
              label: 'Напрямок',
            },
            {
              name: 'duration',
              type: 'text',
              localized: true,
              label: 'Тривалість',
            },
            {
              name: 'groupSize',
              type: 'text',
              localized: true,
              label: 'Розмір групи',
            },
            {
              name: 'description',
              type: 'richText', // ИЗМЕНЕНО: Теперь здесь Rich Text редактор
              label: 'Детальний опис туру',
              localized: true,
            },
            {
              name: 'mainImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Головне фото',
            },
          ],
        },
        {
          label: 'Програма туру',
          fields: [
            {
              name: 'itinerary',
              type: 'array', // Позволяет добавлять любое кол-во дней
              label: 'Дні програми',
              localized: true,
              fields: [
                {
                  name: 'dayTitle',
                  type: 'text',
                  label: 'Заголовок дня (напр: День 1: Приліт)',
                },
                {
                  name: 'content',
                  type: 'richText', // Rich Text для описания каждого дня
                  label: 'Опис подій дня',
                },
                {
                  name: 'images',
                  type: 'array',
                  label: 'Фотографії цього дня',
                  fields: [
                    {
                      name: 'image',
                      type: 'upload',
                      relationTo: 'media',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Команда (Турлідери)',
          fields: [
            {
              name: 'leaders',
              type: 'array', // Массив для карточек людей внизу страницы
              label: 'Наші спеціалісти',
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  label: 'Ім’я та Прізвище',
                  required: true,
                },
                {
                  name: 'role',
                  type: 'text',
                  label: 'Посада/Роль (напр: Співзасновник)',
                  localized: true,
                },
                {
                  name: 'photo',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Фото',
                  required: true,
                },
                {
                  name: 'bio',
                  type: 'textarea',
                  label: 'Коротка біографія',
                  localized: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
