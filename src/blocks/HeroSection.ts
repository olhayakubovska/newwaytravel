import { Block } from 'payload'

export const HeroSectionBlock: Block = {
  slug: 'heroSection', // Этот слаг должен совпадать с ключом в RenderBlocks
  fields: [
    {
      name: 'subtitle',
      type: 'text',
      label: 'Подзаголовок',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Главный заголовок',
      required: true,
    },
    {
      name: 'description',
      type: 'text',
      label: 'Описание',
    },
  ],
}
