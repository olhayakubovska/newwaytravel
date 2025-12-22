import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import AboutPageClient from '@/components/blocks/AboutPageClient/AboutPageClient'

interface PageProps {
  params: Promise<{
    locale: string
  }>
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params
  const payload = await getPayload({ config: configPromise })

  // Получаем данные из Payload
  const data = await payload.findGlobal({
    slug: 'about',
    locale: locale as 'uk' | 'en',
  })

  if (!data) return notFound()

  // Передаем данные data в клиентский компонент
  return <AboutPageClient data={data} locale={locale} />
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params
  const payload = await getPayload({ config: configPromise })
  const data = await payload.findGlobal({ slug: 'about', locale: locale as any })

  return {
    title: data?.title || 'About Us | New Way Travel',
    description: 'Learn more about our travel community and expeditions.',
  }
}
