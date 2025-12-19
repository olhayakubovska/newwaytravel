import { Block } from 'payload'

export const VideoBlock: Block = {
  slug: 'videoSection',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Заголовок секции',
      defaultValue: 'Відео з наших мандрівок',
    },
    {
      name: 'items',
      type: 'array',
      label: 'Список видео',
      minRows: 1,
      fields: [
        {
          name: 'videoTitle',
          type: 'text',
          label: 'Название видео',
        },
        {
          name: 'thumbnail',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Обложка (превью)',
        },
        {
          name: 'videoFile',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Файл видео',
        },
      ],
    },
  ],
}
