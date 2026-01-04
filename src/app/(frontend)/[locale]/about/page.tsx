import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import { RenderBlocks } from '@/components/RenderBlocks' // Используем ваш маппер блоков
import { Locale } from '../page'

interface PageProps {
  params: Promise<{
    locale: string
  }>
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params
  const payload = await getPayload({ config: configPromise })

  const pageResult = await payload.find({
    collection: 'pages',
    where: {
      slug: { equals: 'about' },
    },
    locale: locale as Locale,
    depth: 2,
  })

  const page = pageResult.docs[0]

  if (!page) return notFound()

  return <RenderBlocks blocks={page.layout || []} />
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params
  const payload = await getPayload({ config: configPromise })

  const pageResult = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'about' } },
    locale: locale as Locale,
  })

  const page = pageResult.docs[0]

  return {
    title: page?.title || 'About Us | New Way Travel',
    description: 'Learn more about our travel community and expeditions.',
  }
}
