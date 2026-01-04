// import { getPayload } from 'payload'
// import configPromise from '@payload-config'
// import { notFound } from 'next/navigation'
// import AboutPageClient from '@/components/blocks/AboutPageClient/AboutPageClient'
// import { Locale } from '../page'

// interface PageProps {
//   params: Promise<{
//     locale: string
//   }>
// }

// export default async function AboutPage({ params }: PageProps) {
//   const { locale } = await params
//   const payload = await getPayload({ config: configPromise })

//   const data = await payload.findGlobal({
//     slug: 'about',
//     locale: locale as Locale,
//   })

//   if (!data) return notFound()

//   return <AboutPageClient data={data} locale={locale} />
// }

// export async function generateMetadata({ params }: PageProps) {
//   const { locale } = await params
//   const payload = await getPayload({ config: configPromise })
//   const data = await payload.findGlobal({ slug: 'about', locale: locale as any })

//   return {
//     title: data?.title || 'About Us | New Way Travel',
//     description: 'Learn more about our travel community and expeditions.',
//   }
// }

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import { RenderBlocks } from '@/components/RenderBlocks' // Используем ваш маппер блоков

interface PageProps {
  params: Promise<{
    locale: string
  }>
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params
  const payload = await getPayload({ config: configPromise })

  // 1. Ищем страницу в коллекции 'pages' по слагу 'about'
  const pageResult = await payload.find({
    collection: 'pages',
    where: {
      slug: { equals: 'about' },
    },
    locale: locale as any,
    depth: 2,
  })

  const page = pageResult.docs[0]

  // Если страница не создана в админке — 404
  if (!page) return notFound()

  // 2. Рендерим блоки, которые вы добавили этой странице в админке
  return <RenderBlocks blocks={page.layout || []} />
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params
  const payload = await getPayload({ config: configPromise })

  const pageResult = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'about' } },
    locale: locale as any,
  })

  const page = pageResult.docs[0]

  return {
    title: page?.title || 'About Us | New Way Travel',
    description: 'Learn more about our travel community and expeditions.',
  }
}
