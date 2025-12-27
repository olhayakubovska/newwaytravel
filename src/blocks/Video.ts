// import { Block } from 'payload'

// export const VideoBlock: Block = {
//   slug: 'videoSection',
//   labels: {
//     singular: 'Секция видео',
//     plural: 'Секции видео',
//   },
//   fields: [
//     {
//       name: 'title',
//       type: 'text',
//       localized: true,
//     },
//     {
//       name: 'items',
//       type: 'array',
//       minRows: 1,
//       fields: [
//         {
//           name: 'videoTitle',
//           type: 'text',
//           localized: true,
//           required: true,
//         },
//         {
//           name: 'youtubeUrl',
//           type: 'text',
//           label: 'YouTube ссылка',
//         },
//         {
//           name: 'videoFile',
//           type: 'upload',
//           relationTo: 'media',
//           required: true,
//         },
//         {
//           name: 'thumbnail',
//           type: 'upload',
//           relationTo: 'media',
//           required: true,
//         },
//         {
//           name: 'relatedVideos',
//           type: 'array',
//           fields: [
//             {
//               name: 'relatedTitle',
//               type: 'text',
//               localized: true,
//             },
//             {
//               name: 'relatedFile',
//               type: 'upload',
//               relationTo: 'media',
//             },
//             {
//               name: 'relatedImage',
//               type: 'upload',
//               relationTo: 'media',
//             },
//           ],
//         },
//       ],
//     },
//   ],
// }

import { Block } from 'payload'

export const VideoBlock: Block = {
  slug: 'videoSection',
  labels: {
    singular: 'Секция видео',
    plural: 'Секции видео',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
    },
    {
      name: 'videos',
      type: 'relationship',
      relationTo: 'videos',
      hasMany: true,
      required: true,
      label: 'Видео для слайдера',
    },
  ],
}
