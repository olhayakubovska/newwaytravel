import { Block } from 'payload'

export const ConsultationBlock: Block = {
  slug: 'consultation',
  labels: {
    singular: 'Консультація',
    plural: 'Секції консультацій',
  },
  fields: [
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media', // Название вашей коллекции с картинками
      label: 'Фонове зображення',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      localized: true, // Добавляем локализацию, если нужно
      label: 'Заголовок',
      defaultValue: 'Не знаєш що вибрати?',
    },
    {
      name: 'text',
      type: 'textarea',
      localized: true,
      label: 'Текст під заголовком',
    },
    {
      name: 'buttonText',
      type: 'text',
      localized: true,
      label: 'Текст кнопки',
      defaultValue: 'Зв’язатися з нами',
    },
    {
      name: 'phoneNumber',
      type: 'text',
      label: 'Номер телефону для кнопки',
      localized: true,
      admin: {
        placeholder: '+380934453182',
      },
    },
  ],
}
