import { CollectionConfig } from 'payload'

export const Videos: CollectionConfig = {
  slug: 'videos',
  labels: {
    singular: 'Видео',
    plural: 'Видео',
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
      required: true,
      label: 'Название видео',
    },
    {
      name: 'youtubeUrl',
      type: 'text',
      label: 'YouTube ссылка',
    },
    {
      name: 'videoFile',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Видео файл (mp4)',
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Превью',
    },
    {
      name: 'relatedVideos',
      type: 'relationship',
      relationTo: 'videos',
      hasMany: true,
      label: 'Похожие видео',
    },
  ],
}
