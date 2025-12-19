import { autoTranslate } from '../hooks/autoTranslate'
import { CollectionConfig } from 'payload'

export const Tours: CollectionConfig = {
  slug: 'tours',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'location'],
  },
  hooks: {
    afterChange: [
      autoTranslate([
        'name',
        'description',
        'location',
        'duration',
        'groupSize',
        // 'category' и 'month' ИСКЛЮЧЕНЫ из автоперевода,
        // так как они управляются через предопределенные опции ниже
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
      localized: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      localized: true,
      label: 'Категорія',
      options: [
        { label: { en: 'Cold countries', uk: 'Холодні країни' }, value: 'cold-countries' },
        { label: { en: 'Islands', uk: 'Острови' }, value: 'islands' },
        { label: { en: 'Hot countries', uk: 'Спекотні країни' }, value: 'hot-countries' },
        { label: { en: 'Extreme tours', uk: 'Екстремальні тури' }, value: 'extreme' },
        { label: { en: 'Neutral climate', uk: 'Нейтральний клімат' }, value: 'neutral' },
        { label: { en: 'Trailers', uk: 'Трейлери' }, value: 'trailers' },
        { label: { en: 'Wildlife', uk: 'Дика природа' }, value: 'wildlife' },
        { label: { en: 'Cruise', uk: 'Круїз' }, value: 'cruise' },
      ],
    },
    {
      name: 'location',
      type: 'text',
      required: true,
      label: 'Напрямок (Країна/Регіон)',
      localized: true,
    },
    {
      name: 'month',
      type: 'select',
      localized: true,
      label: 'Місяць',
      options: [
        { label: { en: 'January', uk: 'Січень' }, value: 'jan' },
        { label: { en: 'February', uk: 'Лютий' }, value: 'feb' },
        { label: { en: 'March', uk: 'Березень' }, value: 'mar' },
        { label: { en: 'April', uk: 'Квітень' }, value: 'apr' },
        { label: { en: 'May', uk: 'Травень' }, value: 'may' },
        { label: { en: 'June', uk: 'Червень' }, value: 'jun' },
        { label: { en: 'July', uk: 'Липень' }, value: 'jul' },
        { label: { en: 'August', uk: 'Серпень' }, value: 'aug' },
        { label: { en: 'September', uk: 'Вересень' }, value: 'sep' },
        { label: { en: 'October', uk: 'Жовтень' }, value: 'oct' },
        { label: { en: 'November', uk: 'Листопад' }, value: 'nov' },
        { label: { en: 'December', uk: 'Грудень' }, value: 'dec' },
      ],
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      label: 'Ціна (€)',
    },
    {
      name: 'duration',
      type: 'text',
      label: 'Тривалість',
      localized: true,
    },
    {
      name: 'groupSize',
      type: 'text',
      label: 'Розмір групи',
      localized: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Опис',
      localized: true,
    },
    {
      name: 'mainImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Головне фото',
    },
  ],
}
