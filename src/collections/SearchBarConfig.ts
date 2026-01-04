// // import { autoTranslate } from '@/hooks/autoTranslate'
// // import { GlobalConfig } from 'payload'

// // export const SearchBarConfig: GlobalConfig = {
// //   slug: 'searchBar',
// //   label: 'SearchBar setting',
// //   hooks: {
// //     afterChange: [autoTranslate(['categories', 'destinations', 'months'])],
// //   },
// //   fields: [
// //     {
// //       name: 'categories',
// //       label: 'Категорії',
// //       type: 'array',
// //       fields: [
// //         {
// //           name: 'label',
// //           type: 'text',
// //           required: true,
// //           localized: true,
// //         },
// //         {
// //           name: 'value',
// //           type: 'text',
// //           required: true,
// //         },
// //       ],
// //     },
// //     {
// //       name: 'destinations',
// //       label: 'Напрямки',
// //       type: 'array',
// //       fields: [
// //         {
// //           name: 'label',
// //           type: 'text',
// //           required: true,
// //           localized: true,
// //         },
// //         { name: 'value', type: 'text', required: true },
// //       ],
// //     },
// //     {
// //       name: 'months',
// //       label: 'Місяці',
// //       type: 'array',
// //       fields: [
// //         {
// //           name: 'label',
// //           type: 'text',
// //           required: true,
// //           localized: true,
// //         },
// //         { name: 'value', type: 'text', required: true },
// //       ],
// //     },
// //   ],
// // }

// import { autoTranslate } from '@/hooks/autoTranslate'
// import { GlobalConfig } from 'payload'

// export const SearchBarConfig: GlobalConfig = {
//   slug: 'searchBar',
//   label: 'SearchBar setting',
//   hooks: {
//     // Добавьте новые поля в автоперевод, если используете его
//     afterChange: [
//       autoTranslate([
//         'categories',
//         'destinations',
//         'months',
//         'categoryLabel',
//         'destinationLabel',
//         'monthLabel',
//         'searchBtnLabel',
//         'resetBtnLabel',
//       ]),
//     ],
//   },
//   fields: [
//     // --- Новые поля для локализации интерфейса ---
//     {
//       type: 'row',
//       fields: [
//         {
//           name: 'categoryLabel',
//           label: 'Плейсхолдер категорій',
//           type: 'text',
//           localized: true,
//           admin: { width: '33%' },
//         },
//         {
//           name: 'destinationLabel',
//           label: 'Плейсхолдер напрямків',
//           type: 'text',
//           localized: true,
//           admin: { width: '33%' },
//         },
//         {
//           name: 'monthLabel',
//           label: 'Плейсхолдер місяців',
//           type: 'text',
//           localized: true,
//           admin: { width: '33%' },
//         },
//       ],
//     },
//     {
//       type: 'row',
//       fields: [
//         {
//           name: 'searchBtnLabel',
//           label: 'Текст кнопки пошуку',
//           type: 'text',
//           localized: true,
//           admin: { width: '50%' },
//         },
//         {
//           name: 'resetBtnLabel',
//           label: 'Текст кнопки скидання',
//           type: 'text',
//           localized: true,
//           admin: { width: '50%' },
//         },
//       ],
//     },
//     // --- Существующие поля массивов ---
//     {
//       name: 'categories',
//       label: 'Категорії',
//       type: 'array',
//       fields: [
//         { name: 'label', type: 'text', required: true, localized: true },
//         { name: 'value', type: 'text', required: true },
//       ],
//     },
//     {
//       name: 'destinations',
//       label: 'Напрямки',
//       type: 'array',
//       fields: [
//         { name: 'label', type: 'text', required: true, localized: true },
//         { name: 'value', type: 'text', required: true },
//       ],
//     },
//     {
//       name: 'months',
//       label: 'Місяці',
//       type: 'array',
//       fields: [
//         { name: 'label', type: 'text', required: true, localized: true },
//         { name: 'value', type: 'text', required: true },
//       ],
//     },
//   ],
// }
