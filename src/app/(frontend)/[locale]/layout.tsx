import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Footer } from '@/components/blocks/Footer/Footer'
import { Header } from '@/components/blocks/Header/Header'
import { Locale } from './page'

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const payload = await getPayload({ config: configPromise })

  const headerData = await payload.findGlobal({
    slug: 'header',
    locale: locale as any,
  })
  const footerData = await payload.findGlobal({
    slug: 'footer',
    locale: locale as any,
  })
  return (
    <html lang={locale}>
      <body>
        <Header data={headerData} locale={locale as Locale} />
        <main>{children}</main>
        <Footer {...footerData} locale={locale} />{' '}
      </body>
    </html>
  )
}
