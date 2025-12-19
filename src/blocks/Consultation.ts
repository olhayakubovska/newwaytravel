import { Block } from 'payload'

export const ConsultationBlock: Block = {
  slug: 'consultation',
  labels: {
    singular: 'Consultation',
    plural: 'Секции консультаций',
  },
  fields: [
    { name: 'title', type: 'text', label: 'Заголовок', defaultValue: 'Не знаєш що вибрати?' },
    { name: 'text', type: 'textarea', label: 'Текст под заголовком' },
    { name: 'buttonText', type: 'text', label: 'Текст кнопки', defaultValue: 'Зв’язатися з нами' },
  ],
}
