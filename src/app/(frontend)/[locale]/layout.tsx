import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Footer } from '@/components/blocks/Footer/Footer'
import { Header } from '@/components/blocks/Header/Header'
// Импортируем типы из сгенерированного файла
import { Config, Header as HeaderType, Footer as FooterType } from '@/payload-types'

// Определяем тип для локали на основе конфига Payload
type Locale = Config['locale']

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: Locale }> // Используем тип локали здесь
}) {
  const { locale } = await params
  const payload = await getPayload({ config: configPromise })

  // Payload вернет данные в соответствии с типом HeaderType
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
        {/* Используем spread только если пропсы Footer совпадают с FooterType */}
        <Footer {...footerData} locale={locale} />
      </body>
    </html>
  )
}
