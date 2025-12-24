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
    afterChange: [
      autoTranslate([
        'name',
        'description',
        'location',
        'duration',
        'groupSize',
        'category',
        'itinerary',
        // Добавляем новые поля в автоперевод
        'tripDetails',
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
      type: 'tabs',
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
            /* Группа полей для плитки TripDetails */
            {
              name: 'tripDetails',
              type: 'group',
              label: 'Деталі картки (плитка)',
              fields: [
                {
                  name: 'dates',
                  type: 'text',
                  label: 'Дати (напр: 18.10 - 25.10.2025)',
                  localized: true,
                },
                {
                  name: 'priceLabel',
                  type: 'text',
                  label: 'Текст на бейджі ціни (напр: 50€ для ЗСУ)',
                  localized: true,
                },
                // Внутри группы tripDetails в Tours.ts
                {
                  name: 'bookingConditions',
                  type: 'richText', // Меняем с 'text' на 'richText'
                  label: 'Умови бронювання (RichText)',
                  localized: true,
                },
                {
                  name: 'bookingNote',
                  type: 'text',
                  label: 'Примітка до бронювання',
                  localized: true,
                },
              ],
            },
            {
              name: 'duration',
              type: 'text',
              localized: true,
              label: 'Тривалість (текст)',
            },
            {
              name: 'groupSize',
              type: 'text',
              localized: true,
              label: 'Розмір групи',
            },
            {
              name: 'description',
              type: 'richText',
              label: 'Детальний опис туру',
              localized: true,
            },
            {
              name: 'mainImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Головне фото',
            },
            {
              name: 'gallery',
              type: 'array',
              label: 'Галерея туру',
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: false,
                },
              ],
            },
          ],
        },
        {
          label: 'Програма туру',
          fields: [
            {
              name: 'itinerary',
              type: 'array',
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
                  type: 'richText',
                  label: 'Опис подій дня',
                },
                {
                  name: 'images',
                  type: 'array',
                  label: 'Фотографії этого дня',
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
              type: 'array',
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
