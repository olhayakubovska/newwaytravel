// import { autoTranslate } from '../hooks/autoTranslate'
// import { CollectionConfig } from 'payload'

// export const Tours: CollectionConfig = {
//   slug: 'tours',
//   labels: {
//     singular: 'Тур',
//     plural: 'Всі тури',
//   },
//   admin: {
//     group: 'Усі сторінки',
//     useAsTitle: 'name',
//     defaultColumns: ['name', 'category', 'location', 'price'],
//     // Відновлюємо "глазик"
//     livePreview: {
//       url: ({ data, locale }) => {
//         const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
//         const slug = data?.slug || ''
//         const lang = locale?.code || 'uk'
//         return `${baseUrl}/${lang}/tours/${slug}`
//       },
//     },
//   },
//   hooks: {
//     beforeValidate: [
//       ({ data }) => {
//         if (data?.name && !data?.slug) {
//           return {
//             ...data,
//             slug: data.name
//               .toLowerCase()
//               .trim()
//               .replace(/[^\w\s-]/g, '')
//               .replace(/[\s_-]+/g, '-'),
//           }
//         }
//         return data
//       },
//     ],
//     afterChange: [
//       autoTranslate([
//         'name',
//         'description',
//         'descriptionTitle',
//         'location',
//         'duration',
//         'groupSize',
//         'category',
//         'itinerary',
//         'uiTexts',
//         'uiLabels',
//         'tripAdditionalInfoCard',
//         'additionalInfoCard',
//         'leader',
//       ]),
//     ],
//   },
//   fields: [
//     {
//       name: 'name',
//       type: 'text',
//       required: true,
//       localized: true,
//       label: 'Назва',
//     },
//     {
//       name: 'slug',
//       type: 'text',
//       required: true,
//       unique: true,
//       admin: { position: 'sidebar' },
//       label: 'URL Slug',
//     },
//     { name: 'price', type: 'number', required: true, label: 'Ціна (€)' },
//     {
//       type: 'tabs',
//       tabs: [
//         {
//           label: 'Контент туру',
//           fields: [
//             {
//               name: 'uiTexts',
//               type: 'group',
//               label: 'Тексти кнопок',
//               fields: [
//                 { name: 'bookBtn', type: 'text', localized: true, label: 'Кнопка забронювати' },
//                 { name: 'consultBtn', type: 'text', localized: true, label: 'Кнопка консультація' },
//               ],
//             },
//             { name: 'location', type: 'text', localized: true, label: 'Місце проведення' },
//             { name: 'duration', type: 'text', localized: true, label: 'Тривалість' },
//             { name: 'groupSize', type: 'text', localized: true, label: 'Розмір групи' },
//             { name: 'category', type: 'text', localized: true, label: 'Категорія' },
//             { name: 'mainImage', type: 'upload', relationTo: 'media', label: 'Головне зображення' },
//             {
//               name: 'gallery',
//               type: 'array',
//               label: 'Галерея',
//               fields: [{ name: 'image', type: 'upload', relationTo: 'media', label: 'Зображення' }],
//             },
//           ],
//         },
//         {
//           label: 'Карточки туру',
//           fields: [
//             {
//               name: 'uiLabels',
//               type: 'group',
//               label: 'Заголовки та тексти карток',
//               fields: [
//                 {
//                   name: 'itineraryTitle',
//                   type: 'text',
//                   localized: true,
//                   label: 'Заголовок програми',
//                   // defaultValue: 'Програма туру',
//                 },
//                 {
//                   name: 'leaderTitle',
//                   type: 'text',
//                   localized: true,
//                   label: 'Заголовок турлідера',
//                 },
//                 {
//                   name: 'consultCardTitle',
//                   type: 'text',
//                   localized: true,
//                   label: 'Заголовок консультативної картки',
//                 },
//                 {
//                   name: 'consultCardText',
//                   type: 'textarea',
//                   localized: true,
//                   label: 'Текст консультативної картки',
//                 },
//               ],
//             },
//             // СЕКЦІЯ ГОЛОВНОГО ОПИСУ (ТЕПЕР ТУТ)
//             {
//               name: 'descriptionTitle',
//               type: 'text',
//               localized: true,
//               label: 'Заголовок картки опису',
//               // defaultValue: { uk: 'Інформація про тур', en: 'Tour information' },
//               defaultValue: 'Інформація про тур',
//             },
//             {
//               name: 'description',
//               type: 'richText',
//               localized: true,
//               label: 'Головний опис (Картка інформації)',
//             },
//             // ДОДАТКОВІ КАРТКИ
//             {
//               name: 'tripAdditionalInfoCard',
//               type: 'group',
//               label: 'Додаткова інформація туру (Картка 1)',
//               fields: [
//                 { name: 'title', type: 'text', localized: true, label: 'Заголовок' },
//                 { name: 'content', type: 'richText', localized: true, label: 'Контент' },
//               ],
//             },
//             {
//               name: 'additionalInfoCard',
//               type: 'group',
//               label: 'Додаткова інформація (Картка 2)',
//               fields: [
//                 { name: 'title', type: 'text', localized: true, label: 'Заголовок' },
//                 { name: 'content', type: 'richText', localized: true, label: 'Контент' },
//               ],
//             },
//           ],
//         },
//         {
//           label: 'Програма',
//           fields: [
//             {
//               name: 'itinerary',
//               type: 'array',
//               label: 'Програма по днях',
//               fields: [
//                 { name: 'dayTitle', type: 'text', localized: true, label: 'Назва дня' },
//                 { name: 'content', type: 'richText', localized: true, label: 'Контент' },
//                 {
//                   name: 'images',
//                   type: 'array',
//                   fields: [{ name: 'image', type: 'upload', relationTo: 'media' }],
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           label: 'Турлідер',
//           fields: [
//             {
//               name: 'leader',
//               type: 'group',
//               label: 'Інформація про турлідера',
//               fields: [
//                 { name: 'name', type: 'text', localized: true, label: 'Ім’я' },
//                 { name: 'role', type: 'text', localized: true, label: 'Роль' },
//                 { name: 'photo', type: 'upload', relationTo: 'media', label: 'Фото' },
//                 { name: 'bio', type: 'textarea', localized: true, label: 'Біографія' },
//               ],
//             },
//           ],
//         },
//       ],
//     },
//   ],
// }

// import { autoTranslate } from '../hooks/autoTranslate'
// import { CollectionConfig } from 'payload'

// export const Tours: CollectionConfig = {
//   slug: 'tours',
//   labels: {
//     singular: 'Тур',
//     plural: 'Всі тури',
//   },
//   admin: {
//     group: 'Усі сторінки',
//     useAsTitle: 'name',
//     defaultColumns: ['name', 'category', 'location', 'price'],
//     livePreview: {
//       url: ({ data, locale }) => {
//         const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
//         const slug = data?.slug || ''
//         const lang = locale?.code || 'uk'
//         return `${baseUrl}/${lang}/tours/${slug}`
//       },
//     },
//   },
//   hooks: {
//     beforeValidate: [
//       ({ data }) => {
//         if (data?.name && !data?.slug) {
//           return {
//             ...data,
//             slug: data.name
//               .toLowerCase()
//               .trim()
//               .replace(/[^\w\s-]/g, '')
//               .replace(/[\s_-]+/g, '-'),
//           }
//         }
//         return data
//       },
//     ],
//     afterChange: [
//       autoTranslate([
//         'name',
//         'description',
//         'descriptionTitle',
//         'location',
//         'duration',
//         'groupSize',
//         'category',
//         'itinerary',
//         'uiTexts',
//         'uiLabels',
//         'tripAdditionalInfoCard',
//         'additionalInfoCard',
//         'leader',
//         'tripDetailsCard',
//         'consultCardTitle',
//         'consultCardText',
//         'itineraryTitle',
//         'leaderTitle',
//       ]),
//     ],
//   },
//   fields: [
//     { name: 'name', type: 'text', required: true, localized: true, label: 'Назва' },
//     { name: 'slug', type: 'text', required: true, unique: true, admin: { position: 'sidebar' } },
//     { name: 'price', type: 'number', required: true, label: 'Ціна (€)' },
//     {
//       type: 'tabs',
//       tabs: [
//         {
//           label: 'Контент туру',
//           fields: [
//             {
//               name: 'uiTexts',
//               type: 'group',
//               label: 'Тексти кнопок',
//               fields: [
//                 {
//                   name: 'bookBtn',
//                   type: 'text',
//                   localized: true,
//                   label: 'Кнопка забронювати',
//                   defaultValue: 'Забронювати',
//                 },
//                 {
//                   name: 'consultBtn',
//                   type: 'text',
//                   localized: true,
//                   label: 'Кнопка консультація',
//                   defaultValue: 'Консультація',
//                 },
//               ],
//             },
//             { name: 'location', type: 'text', localized: true, label: 'Місце проведення' },
//             { name: 'duration', type: 'text', localized: true, label: 'Тривалість' },
//             { name: 'groupSize', type: 'text', localized: true, label: 'Розмір групи' },
//             { name: 'category', type: 'text', localized: true, label: 'Категорія' },
//             { name: 'mainImage', type: 'upload', relationTo: 'media', label: 'Головне зображення' },
//             {
//               name: 'gallery',
//               type: 'array',
//               label: 'Галерея',
//               fields: [{ name: 'image', type: 'upload', relationTo: 'media' }],
//             },
//           ],
//         },
//         {
//           label: 'Карточки туру',
//           fields: [
//             // 1. ЗАГОЛОВКИ (ОКРЕМО)
//             {
//               name: 'itineraryTitle',
//               type: 'text',
//               localized: true,
//               label: 'Заголовок програми (Загальний)',
//               defaultValue: 'Програма туру',
//             },
//             {
//               name: 'leaderTitle',
//               type: 'text',
//               localized: true,
//               label: 'Заголовок турлідера (Загальний)',
//               defaultValue: 'Турлідер',
//             },

//             // 2. КОНСУЛЬТАТИВНА КАРТКА (ВІДОКРЕМЛЕНА)

//             // 3. КАРТКА ОПИСУ (ВІДОКРЕМЛЕНА)
//             {
//               name: 'descriptionTitle',
//               type: 'group',
//               label: 'Заголовок картки опису',
//               fields: [
//                 { name: 'title', type: 'text', localized: true, label: 'Заголовок' },
//                 { name: 'content', type: 'richText', localized: true, label: 'Контент' },
//               ],
//             },
//             {
//               name: 'consultCardTitle',
//               type: 'group',
//               label: 'Заголовок картки опису',
//               fields: [
//                 { name: 'title', type: 'text', localized: true, label: 'Заголовок' },
//                 { name: 'content', type: 'richText', localized: true, label: 'Контент' },
//               ],
//             },

//             //      {
//             //   name: 'consultCardTitle',
//             //   type: 'text',
//             //   localized: true,
//             //   label: 'Заголовок консультативної картки',
//             //   defaultValue: 'Тільки найяскравіші враження!',
//             //   admin: { description: 'Помаранчева картка поруч з програмою' },
//             // },
//             // {
//             //   name: 'consultCardText',
//             //   type: 'textarea',
//             //   localized: true,
//             //   label: 'Текст консультативної картки',
//             //   defaultValue:
//             //     'Ми відкриті до пропозицій та можемо адаптувати програму під ваші побажання.',
//             // },
//             // {
//             //   name: 'descriptionTitle',
//             //   type: 'text',
//             //   localized: true,
//             //   label: 'Заголовок картки опису',
//             //   defaultValue: 'Інформація про тур',
//             // },
//             // {
//             //   name: 'description',
//             //   type: 'richText',
//             //   localized: true,
//             //   label: 'Головний опис (Rich Text)',
//             // },

//             // 4. ГРУПИ ДОДАТКОВИХ КАРТОК (ВІДОКРЕМЛЕНІ)
//             {
//               name: 'tripDetailsCard',
//               type: 'group',
//               label: 'Деталі подорожі (Trip Details)',
//               fields: [
//                 { name: 'title', type: 'text', localized: true, label: 'Заголовок' },
//                 { name: 'content', type: 'richText', localized: true, label: 'Контент' },
//               ],
//             },
//             {
//               name: 'tripAdditionalInfoCard',
//               type: 'group',
//               label: 'Додаткова інформація туру (Картка 1)',
//               fields: [
//                 { name: 'title', type: 'text', localized: true, label: 'Заголовок' },
//                 { name: 'content', type: 'richText', localized: true, label: 'Контент' },
//               ],
//             },
//             {
//               name: 'additionalInfoCard',
//               type: 'group',
//               label: 'Додаткова інформація (Картка 2)',
//               fields: [
//                 { name: 'title', type: 'text', localized: true, label: 'Заголовок' },
//                 { name: 'content', type: 'richText', localized: true, label: 'Контент' },
//               ],
//             },
//           ],
//         },
//         {
//           label: 'Програма',
//           fields: [
//             {
//               name: 'itinerary',
//               type: 'array',
//               label: 'Програма по днях',
//               fields: [
//                 { name: 'dayTitle', type: 'text', localized: true, label: 'Назва дня' },
//                 { name: 'content', type: 'richText', localized: true, label: 'Контент' },
//                 {
//                   name: 'images',
//                   type: 'array',
//                   fields: [{ name: 'image', type: 'upload', relationTo: 'media' }],
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           label: 'Турлідер',
//           fields: [
//             {
//               name: 'leader',
//               type: 'group',
//               label: 'Інформація про турлідера',
//               fields: [
//                 { name: 'name', type: 'text', localized: true, label: 'Ім’я' },
//                 { name: 'role', type: 'text', localized: true, label: 'Роль' },
//                 { name: 'photo', type: 'upload', relationTo: 'media', label: 'Фото' },
//                 { name: 'bio', type: 'textarea', localized: true, label: 'Біографія' },
//               ],
//             },
//           ],
//         },
//       ],
//     },
//   ],
// }
// import { autoTranslate } from '../hooks/autoTranslate'
// import { CollectionConfig } from 'payload'

// export const Tours: CollectionConfig = {
//   slug: 'tours',
//   labels: {
//     singular: 'Тур',
//     plural: 'Всі тури',
//   },
//   admin: {
//     group: 'Усі сторінки',
//     useAsTitle: 'name',
//     defaultColumns: ['name', 'category', 'location', 'price'],
//     livePreview: {
//       url: ({ data, locale }) => {
//         const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
//         const slug = data?.slug || ''
//         const lang = locale?.code || 'uk'
//         return `${baseUrl}/${lang}/tours/${slug}`
//       },
//     },
//   },
//   hooks: {
//     beforeValidate: [
//       ({ data }) => {
//         if (data?.name && !data?.slug) {
//           return {
//             ...data,
//             slug: data.name
//               .toLowerCase()
//               .trim()
//               .replace(/[^\w\s-]/g, '')
//               .replace(/[\s_-]+/g, '-'),
//           }
//         }
//         return data
//       },
//     ],
//     afterChange: [
//       autoTranslate([
//         'name',
//         'description',
//         'location',
//         'duration',
//         'groupSize',
//         'category',
//         'itinerary',
//         'uiTexts',
//         'uiLabels',
//         'tripAdditionalInfoCard',
//         'additionalInfoCard',
//         'leader',
//         'tripDetailsCard',
//       ]),
//     ],
//   },
//   fields: [
//     { name: 'name', type: 'text', required: true, localized: true, label: 'Назва туру', admin: { placeholder: 'Наприклад: Магія Карпат' } },
//     { name: 'slug', type: 'text', required: true, unique: true, admin: { position: 'sidebar' } },
//     { name: 'price', type: 'number', required: true, label: 'Ціна (€)', defaultValue: 500 },
//     {
//       type: 'tabs',
//       tabs: [
//         {
//           label: 'Контент туру',
//           fields: [
//             {
//               name: 'uiTexts',
//               type: 'group',
//               label: 'Тексти кнопок',
//               fields: [
//                 { name: 'bookBtn', type: 'text', localized: true, label: 'Кнопка забронювати', defaultValue: 'Забронювати' },
//                 { name: 'consultBtn', type: 'text', localized: true, label: 'Кнопка консультація', defaultValue: 'Консультація' },
//               ],
//             },
//             { name: 'location', type: 'text', localized: true, label: 'Місце проведення', admin: { placeholder: 'Ісландія, Рейк’явік' } },
//             { name: 'duration', type: 'text', localized: true, label: 'Тривалість', admin: { placeholder: '7 днів / 6 ночей' } },
//             { name: 'groupSize', type: 'text', localized: true, label: 'Розмір групи', admin: { placeholder: 'до 10 осіб' } },
//             { name: 'category', type: 'text', localized: true, label: 'Категорія', admin: { placeholder: 'Експедиція' } },
//             { name: 'mainImage', type: 'upload', relationTo: 'media', label: 'Головне зображення' },
//             {
//               name: 'gallery',
//               type: 'array',
//               label: 'Галерея',
//               fields: [{ name: 'image', type: 'upload', relationTo: 'media' }],
//             },
//           ],
//         },
//         {
//           label: 'Карточки туру',
//           fields: [
//             {
//               name: 'uiLabels',
//               type: 'group',
//               label: 'Загальні заголовки секцій',
//               fields: [
//                 { name: 'itineraryTitle', type: 'text', localized: true, label: 'Заголовок програми', defaultValue: 'Програма туру' },
//                 { name: 'leaderTitle', type: 'text', localized: true, label: 'Заголовок турлідера', defaultValue: 'Ваш провідник' },
//                 { name: 'consultCardTitle', type: 'text', localized: true, label: 'Заголовок помаранчевої картки', defaultValue: 'Потрібна допомога?' },
//                 { name: 'consultCardText', type: 'textarea', localized: true, label: 'Текст помаранчевої картки', defaultValue: 'Залиште заявку, і ми допоможемо обрати найкращий варіант.' },
//               ],
//             },
//             {
//               name: 'descriptionCard', // Перейменовано для ясності
//               type: 'group',
//               label: 'Головна інформація (Картка опису)',
//               fields: [
//                 { name: 'title', type: 'text', localized: true, label: 'Заголовок', defaultValue: 'Про цей тур' },
//                 { name: 'content', type: 'richText', localized: true, label: 'Опис туру' },
//               ],
//             },
//             {
//               name: 'tripDetailsCard',
//               type: 'group',
//               label: 'Деталі подорожі (Trip Details)',
//               fields: [
//                 { name: 'title', type: 'text', localized: true, label: 'Заголовок', defaultValue: 'Деталі подорожі' },
//                 { name: 'content', type: 'richText', localized: true, label: 'Контент' },
//               ],
//             },
//             {
//               name: 'tripAdditionalInfoCard',
//               type: 'group',
//               label: 'Додаткова інформація (Картка 1)',
//               fields: [
//                 { name: 'title', type: 'text', localized: true, label: 'Заголовок', defaultValue: 'Що включено' },
//                 { name: 'content', type: 'richText', localized: true, label: 'Контент' },
//               ],
//             },
//           ],
//         },
//         {
//           label: 'Програма',
//           fields: [
//             {
//               name: 'itinerary',
//               type: 'array',
//               label: 'Програма по днях',
//               labels: { singular: 'День', plural: 'Дні' },
//               fields: [
//                 { name: 'dayTitle', type: 'text', localized: true, label: 'Назва дня (напр. День 1: Приліт)' },
//                 { name: 'content', type: 'richText', localized: true, label: 'Опис активностей' },
//                 {
//                   name: 'images',
//                   type: 'array',
//                   label: 'Фото дня',
//                   fields: [{ name: 'image', type: 'upload', relationTo: 'media' }],
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           label: 'Турлідер',
//           fields: [
//             {
//               name: 'leader',
//               type: 'group',
//               label: 'Інформація про турлідера',
//               fields: [
//                 { name: 'name', type: 'text', localized: true, label: 'Ім’я' },
//                 { name: 'role', type: 'text', localized: true, label: 'Роль (напр. Гід-фотограф)' },
//                 { name: 'photo', type: 'upload', relationTo: 'media', label: 'Фото' },
//                 { name: 'bio', type: 'textarea', localized: true, label: 'Біографія' },
//               ],
//             },
//           ],
//         },
//       ],
//     },
//   ],
// }

// import { autoTranslate } from '../hooks/autoTranslate'
// import { CollectionConfig } from 'payload'

// export const Tours: CollectionConfig = {
//   slug: 'tours',
//   labels: {
//     singular: 'Тур',
//     plural: 'Всі тури',
//   },
//   admin: {
//     group: 'Усі сторінки',
//     useAsTitle: 'name',
//     defaultColumns: ['name', 'category', 'location', 'price'],
//     livePreview: {
//       url: ({ data, locale }) => {
//         const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
//         const slug = data?.slug || ''
//         const lang = locale?.code || 'uk'
//         return `${baseUrl}/${lang}/tours/${slug}`
//       },
//     },
//   },
//   hooks: {
//     beforeValidate: [
//       ({ data }) => {
//         if (data?.name && !data?.slug) {
//           return {
//             ...data,
//             slug: data.name
//               .toLowerCase()
//               .trim()
//               .replace(/[^\w\s-]/g, '')
//               .replace(/[\s_-]+/g, '-'),
//           }
//         }
//         return data
//       },
//     ],
//     afterChange: [
//       autoTranslate([
//         'name',
//         'description',
//         'location',
//         'duration',
//         'groupSize',
//         'category',
//         'itinerary',
//         'uiTexts',
//         'uiLabels',
//         'tripAdditionalInfoCard',
//         'additionalInfoCard',
//         'leader',
//         'tripDetailsCard',
//       ]),
//     ],
//   },
//   fields: [
//     { name: 'name', type: 'text', required: true, localized: true, label: 'Назва туру', admin: { placeholder: 'Наприклад: Магія Карпат' } },
//     { name: 'slug', type: 'text', required: true, unique: true, admin: { position: 'sidebar' } },
//     { name: 'price', type: 'number', required: true, label: 'Ціна (€)', defaultValue: 500 },
//     {
//       type: 'tabs',
//       tabs: [
//         {
//           label: 'Контент туру',
//           fields: [
//             {
//               name: 'uiTexts',
//               type: 'group',
//               label: 'Тексти кнопок',
//               fields: [
//                 { name: 'bookBtn', type: 'text', localized: true, label: 'Кнопка забронювати', defaultValue: 'Забронювати' },
//                 { name: 'consultBtn', type: 'text', localized: true, label: 'Кнопка консультація', defaultValue: 'Консультація' },
//               ],
//             },
//             { name: 'location', type: 'text', localized: true, label: 'Місце проведення', admin: { placeholder: 'Ісландія, Рейк’явік' } },
//             { name: 'duration', type: 'text', localized: true, label: 'Тривалість', admin: { placeholder: '7 днів / 6 ночей' } },
//             { name: 'groupSize', type: 'text', localized: true, label: 'Розмір групи', admin: { placeholder: 'до 10 осіб' } },
//             { name: 'category', type: 'text', localized: true, label: 'Категорія', admin: { placeholder: 'Експедиція' } },
//             { name: 'mainImage', type: 'upload', relationTo: 'media', label: 'Головне зображення' },
//             {
//               name: 'gallery',
//               type: 'array',
//               label: 'Галерея',
//               fields: [{ name: 'image', type: 'upload', relationTo: 'media' }],
//             },
//           ],
//         },
//         {
//           label: 'Карточки туру',
//           fields: [
//             {
//               name: 'uiLabels',
//               type: 'group',
//               label: 'Загальні заголовки секцій',
//               fields: [
//                 { name: 'itineraryTitle', type: 'text', localized: true, label: 'Заголовок програми', defaultValue: 'Програма туру' },
//                 { name: 'leaderTitle', type: 'text', localized: true, label: 'Заголовок турлідера', defaultValue: 'Ваш провідник' },
//                 { name: 'consultCardTitle', type: 'text', localized: true, label: 'Заголовок помаранчевої картки', defaultValue: 'Потрібна допомога?' },
//                 { name: 'consultCardText', type: 'textarea', localized: true, label: 'Текст помаранчевої картки', defaultValue: 'Залиште заявку, і ми допоможемо обрати найкращий варіант.' },
//               ],
//             },
//             {
//               name: 'descriptionCard', // Перейменовано для ясності
//               type: 'group',
//               label: 'Головна інформація (Картка опису)',
//               fields: [
//                 { name: 'title', type: 'text', localized: true, label: 'Заголовок', defaultValue: 'Про цей тур' },
//                 { name: 'content', type: 'richText', localized: true, label: 'Опис туру' },
//               ],
//             },
//             {
//               name: 'tripDetailsCard',
//               type: 'group',
//               label: 'Деталі подорожі (Trip Details)',
//               fields: [
//                 { name: 'title', type: 'text', localized: true, label: 'Заголовок', defaultValue: 'Деталі подорожі' },
//                 { name: 'content', type: 'richText', localized: true, label: 'Контент' },
//               ],
//             },
//             {
//               name: 'tripAdditionalInfoCard',
//               type: 'group',
//               label: 'Додаткова інформація (Картка 1)',
//               fields: [
//                 { name: 'title', type: 'text', localized: true, label: 'Заголовок', defaultValue: 'Що включено' },
//                 { name: 'content', type: 'richText', localized: true, label: 'Контент' },
//               ],
//             },
//           ],
//         },
//         {
//           label: 'Програма',
//           fields: [
//             {
//               name: 'itinerary',
//               type: 'array',
//               label: 'Програма по днях',
//               labels: { singular: 'День', plural: 'Дні' },
//               fields: [
//                 { name: 'dayTitle', type: 'text', localized: true, label: 'Назва дня (напр. День 1: Приліт)' },
//                 { name: 'content', type: 'richText', localized: true, label: 'Опис активностей' },
//                 {
//                   name: 'images',
//                   type: 'array',
//                   label: 'Фото дня',
//                   fields: [{ name: 'image', type: 'upload', relationTo: 'media' }],
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           label: 'Турлідер',
//           fields: [
//             {
//               name: 'leader',
//               type: 'group',
//               label: 'Інформація про турлідера',
//               fields: [
//                 { name: 'name', type: 'text', localized: true, label: 'Ім’я' },
//                 { name: 'role', type: 'text', localized: true, label: 'Роль (напр. Гід-фотограф)' },
//                 { name: 'photo', type: 'upload', relationTo: 'media', label: 'Фото' },
//                 { name: 'bio', type: 'textarea', localized: true, label: 'Біографія' },
//               ],
//             },
//           ],
//         },
//       ],
//     },
//   ],
// }

// import { autoTranslate } from '../hooks/autoTranslate'
// import { CollectionConfig } from 'payload'

// export const Tours: CollectionConfig = {
//   slug: 'tours',
//   labels: {
//     singular: 'Тур',
//     plural: 'Всі тури',
//   },
//   admin: {
//     group: 'Усі сторінки',
//     useAsTitle: 'name',
//     defaultColumns: ['name', 'category', 'location', 'price'],
//     livePreview: {
//       url: ({ data, locale }) => {
//         const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
//         const slug = data?.slug || ''
//         const lang = locale?.code || 'uk'
//         return `${baseUrl}/${lang}/tours/${slug}`
//       },
//     },
//   },
//   hooks: {
//     beforeValidate: [
//       ({ data }) => {
//         if (data?.name && !data?.slug) {
//           return {
//             ...data,
//             slug: data.name
//               .toLowerCase()
//               .trim()
//               .replace(/[^\w\s-]/g, '')
//               .replace(/[\s_-]+/g, '-'),
//           }
//         }
//         return data
//       },
//     ],
//     afterChange: [
//       autoTranslate([
//         'name',
//         'location',
//         'duration',
//         'groupSize',
//         'category',
//         'uiTexts',
//         'uiLabels',
//         'consultationCard',
//         'descriptionCard',
//         'tripDetailsCard',
//         'tripAdditionalInfoCard',
//         'additionalInfoCard',
//         'itinerary',
//         'leader',
//       ]),
//     ],
//   },
//   fields: [
//     { name: 'name', type: 'text', required: true, localized: true, label: 'Назва туру' },
//     { name: 'slug', type: 'text', required: true, unique: true, admin: { position: 'sidebar' } },
//     { name: 'price', type: 'number', required: true, label: 'Ціна (€)', defaultValue: 0 },
//     {
//       type: 'tabs',
//       tabs: [
//         {
//           label: 'Контент туру',
//           fields: [
//             {
//               name: 'uiTexts',
//               type: 'group',
//               label: 'Тексти кнопок',
//               fields: [
//                 {
//                   name: 'bookBtn',
//                   type: 'text',
//                   localized: true,
//                   label: 'Кнопка забронювати',
//                   defaultValue: 'Забронювати',
//                 },
//                 {
//                   name: 'consultBtn',
//                   type: 'text',
//                   localized: true,
//                   label: 'Кнопка консультація',
//                   defaultValue: 'Консультація',
//                 },
//               ],
//             },
//             { name: 'location', type: 'text', localized: true, label: 'Місце проведення' },
//             { name: 'duration', type: 'text', localized: true, label: 'Тривалість' },
//             { name: 'groupSize', type: 'text', localized: true, label: 'Розмір групи' },
//             { name: 'category', type: 'text', localized: true, label: 'Категорія' },
//             { name: 'mainImage', type: 'upload', relationTo: 'media', label: 'Головне зображення' },
//             {
//               name: 'gallery',
//               type: 'array',
//               label: 'Галерея',
//               fields: [{ name: 'image', type: 'upload', relationTo: 'media' }],
//             },
//           ],
//         },
//         {
//           label: 'Карточки туру',
//           fields: [
//             {
//               name: 'tripAdditionalInfoCard',
//               type: 'group',
//               label: 'Додаткова інформація (Картка 1)',
//               fields: [
//                 { name: 'title', type: 'text', localized: true, label: 'Заголовок' },
//                 { name: 'content', type: 'richText', localized: true, label: 'Контент' },
//               ],
//             },
//             {
//               name: 'additionalInfoCard',
//               type: 'group',
//               label: 'Додаткова інформація (Картка 2)',
//               fields: [
//                 { name: 'title', type: 'text', localized: true, label: 'Заголовок' },
//                 { name: 'content', type: 'richText', localized: true, label: 'Контент' },
//               ],
//             },
//             {
//               name: 'uiLabels',
//               type: 'group',
//               label: 'Загальні заголовки секцій',
//               fields: [
//                 {
//                   name: 'itineraryTitle',
//                   type: 'text',
//                   localized: true,
//                   label: 'Заголовок секцiя програми',
//                   defaultValue: 'Програма туру',
//                 },
//                 {
//                   name: 'leaderTitle',
//                   type: 'text',
//                   localized: true,
//                   label: 'Заголовок секцiя турлідера',
//                   defaultValue: 'Турлідер',
//                 },
//               ],
//             },

//             {
//               name: 'descriptionCard',
//               type: 'group',
//               label: 'Головна інформація (Картка опису)',
//               fields: [
//                 {
//                   name: 'title',
//                   type: 'text',
//                   localized: true,
//                   label: 'Заголовок',
//                   defaultValue: 'Інформація про тур',
//                 },
//                 { name: 'content', type: 'richText', localized: true, label: 'Контент опису' },
//               ],
//             },
//             {
//               name: 'tripDetailsCard',
//               type: 'group',
//               label: 'Деталі подорожі (Trip Details)',
//               fields: [
//                 { name: 'title', type: 'text', localized: true, label: 'Заголовок' },
//                 { name: 'content', type: 'richText', localized: true, label: 'Контент' },
//               ],
//             },

//             {
//               name: 'consultationCard',
//               type: 'group',
//               label: 'Картка консультація',
//               fields: [
//                 {
//                   name: 'title',
//                   type: 'text',
//                   localized: true,
//                   label: 'Заголовок картки',
//                   defaultValue: 'Тільки найяскравіші враження!',
//                 },
//                 {
//                   name: 'text',
//                   type: 'textarea',
//                   localized: true,
//                   label: 'Текст картки',
//                   defaultValue:
//                     'Ми відкриті до пропозицій та можемо адаптувати програму під ваші побажання.',
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           label: 'Програма',
//           fields: [
//             {
//               name: 'itinerary',
//               type: 'array',
//               label: 'Програма по днях',
//               fields: [
//                 { name: 'dayTitle', type: 'text', localized: true, label: 'Назва дня' },
//                 { name: 'content', type: 'richText', localized: true, label: 'Контент' },
//                 {
//                   name: 'images',
//                   type: 'array',
//                   fields: [{ name: 'image', type: 'upload', relationTo: 'media' }],
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           label: 'Турлідер',
//           fields: [
//             {
//               name: 'leader',
//               type: 'group',
//               label: 'Інформація про турлідера',
//               fields: [
//                 { name: 'name', type: 'text', localized: true, label: 'Ім’я' },
//                 { name: 'role', type: 'text', localized: true, label: 'Роль' },
//                 { name: 'photo', type: 'upload', relationTo: 'media', label: 'Фото' },
//                 { name: 'bio', type: 'textarea', localized: true, label: 'Біографія' },
//               ],
//             },
//           ],
//         },
//       ],
//     },
//   ],
// }
import { autoTranslate } from '../hooks/autoTranslate'
import { CollectionConfig } from 'payload'

export const Tours: CollectionConfig = {
  slug: 'tours',
  labels: {
    singular: 'Тур',
    plural: 'Всі тури',
  },
  admin: {
    group: 'Усі сторінки',
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'location', 'price'],
    livePreview: {
      url: ({ data, locale }) => {
        const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
        const slug = data?.slug || ''
        const lang = locale?.code || 'uk'
        return `${baseUrl}/${lang}/tours/${slug}`
      },
    },
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data?.name && !data?.slug) {
          return {
            ...data,
            slug: data.name
              .toLowerCase()
              .trim()
              .replace(/[^\w\s-]/g, '')
              .replace(/[\s_-]+/g, '-'),
          }
        }
        return data
      },
    ],
    afterChange: [
      autoTranslate([
        'name',
        'location',
        'duration',
        'groupSize',
        'category',
        'uiTexts',
        'uiLabels',
        'consultationCard',
        'descriptionCard',
        'tripDetailsCard',
        'tripAdditionalInfoCard',
        'additionalInfoCard',
        'itinerary',
        'leader',
      ]),
    ],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
      label: 'Назва туру',
      admin: { placeholder: 'Наприклад: Магія Ісландії' },
    },
    { name: 'slug', type: 'text', required: true, unique: true, admin: { position: 'sidebar' } },
    { name: 'price', type: 'number', required: true, label: 'Ціна (€)', defaultValue: 1000 },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Контент туру',
          fields: [
            {
              name: 'uiTexts',
              type: 'group',
              label: 'Тексти кнопок',
              fields: [
                {
                  name: 'bookBtn',
                  type: 'text',
                  localized: true,
                  label: 'Кнопка забронювати',
                  defaultValue: 'Забронювати',
                },
                {
                  name: 'consultBtn',
                  type: 'text',
                  localized: true,
                  label: 'Кнопка консультація',
                  defaultValue: 'Консультація',
                },
              ],
            },
            {
              name: 'location',
              type: 'text',
              localized: true,
              label: 'Місце проведення',
              admin: { placeholder: 'Країна, місто' },
            },
            {
              name: 'duration',
              type: 'text',
              localized: true,
              label: 'Тривалість',
              admin: { placeholder: '7 днів / 6 ночей' },
            },
            {
              name: 'groupSize',
              type: 'text',
              localized: true,
              label: 'Розмір групи',
              admin: { placeholder: 'до 12 осіб' },
            },
            {
              name: 'category',
              type: 'text',
              localized: true,
              label: 'Категорія',
              admin: { placeholder: 'Експедиція' },
            },
            { name: 'mainImage', type: 'upload', relationTo: 'media', label: 'Головне зображення' },
            {
              name: 'gallery',
              type: 'array',
              label: 'Галерея',
              fields: [{ name: 'image', type: 'upload', relationTo: 'media' }],
            },
          ],
        },
        {
          label: 'Карточки туру',
          fields: [
            {
              name: 'uiLabels',
              type: 'group',
              label: '1. Загальні заголовки секцій',
              fields: [
                {
                  name: 'itineraryTitle',
                  type: 'text',
                  localized: true,
                  label: 'Заголовок програми',
                  defaultValue: 'Програма туру',
                },
                {
                  name: 'leaderTitle',
                  type: 'text',
                  localized: true,
                  label: 'Заголовок турлідера',
                  defaultValue: 'Ваш турлідер',
                },
              ],
            },
            {
              name: 'consultationCard',
              type: 'group',
              label: '2. Помаранчева картка (Консультація)',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  localized: true,
                  label: 'Заголовок картки',
                  defaultValue: 'Тільки найяскравіші враження!',
                },
                {
                  name: 'text',
                  type: 'textarea',
                  localized: true,
                  label: 'Текст картки',
                  defaultValue:
                    'Ми відкриті до пропозицій та можемо адаптувати програму під ваші побажання.',
                },
              ],
            },
            {
              name: 'descriptionCard',
              type: 'group',
              label: '3. Головна інформація (Картка опису)',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  localized: true,
                  label: 'Заголовок',
                  defaultValue: 'Інформація про тур',
                },
                { name: 'content', type: 'richText', localized: true, label: 'Контент опису' },
              ],
            },
            {
              name: 'tripDetailsCard',
              type: 'group',
              label: '4. Деталі подорожі (Trip Details)',
              fields: [
                {
                  name: 'bookingConditions',
                  type: 'richText',
                  localized: true,
                  label: 'Умови бронювання (RichText)',
                },
                {
                  name: 'bookingNote',
                  type: 'text',
                  localized: true,
                  label: 'Примітка (маленький текст)',
                  defaultValue: '*Передоплата 50% для бронювання місця',
                },
              ],
            },
            {
              name: 'tripAdditionalInfoCard',
              type: 'group',
              label: '5. Додаткова інформація (Картка 1)',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  localized: true,
                  label: 'Заголовок',
                  defaultValue: 'Що включено',
                },
                { name: 'content', type: 'richText', localized: true, label: 'Контент' },
              ],
            },
            {
              name: 'additionalInfoCard',
              type: 'group',
              label: '6. Додаткова інформація (Картка 2)',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  localized: true,
                  label: 'Заголовок',
                  defaultValue: 'Що не включено',
                },
                { name: 'content', type: 'richText', localized: true, label: 'Контент' },
              ],
            },
          ],
        },
        {
          label: 'Програма',
          fields: [
            {
              name: 'itinerary',
              type: 'array',
              label: 'Програма по днях',
              labels: { singular: 'День', plural: 'Дні' },
              fields: [
                { name: 'dayTitle', type: 'text', localized: true, label: 'Назва дня' },
                {
                  name: 'content',
                  type: 'richText',
                  localized: true,
                  label: 'Контент активностей',
                },
                {
                  name: 'images',
                  type: 'array',
                  label: 'Фотографії дня',
                  fields: [{ name: 'image', type: 'upload', relationTo: 'media' }],
                },
              ],
            },
          ],
        },
        {
          label: 'Турлідер',
          fields: [
            {
              name: 'leader',
              type: 'group',
              label: 'Інформація про турлідера',
              fields: [
                { name: 'name', type: 'text', localized: true, label: 'Ім’я' },
                { name: 'role', type: 'text', localized: true, label: 'Роль' },
                { name: 'photo', type: 'upload', relationTo: 'media', label: 'Фото' },
                { name: 'bio', type: 'textarea', localized: true, label: 'Біографія' },
              ],
            },
          ],
        },
      ],
    },
  ],
}
