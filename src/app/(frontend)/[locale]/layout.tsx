import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Footer } from '@/components/blocks/Footer/Footer'
import { Header } from '@/components/blocks/Header/Header'
import { Config, Header as HeaderType, Footer as FooterType } from '@/payload-types'

type Locale = Config['locale']

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const payload = await getPayload({ config: configPromise })

  const headerData: HeaderType = await payload.findGlobal({
    slug: 'header',
    locale,
  })

  const footerData: FooterType = await payload.findGlobal({
    slug: 'footer',
    locale,
  })

  return (
    <html lang={locale}>
      <body>
        <Header data={headerData} locale={locale} />
        <main>{children}</main>
        <Footer {...footerData} locale={locale} />
      </body>
    </html>
  )
}
