// src/app/(frontend)/layout.tsx
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Footer } from '@/components/blocks/Footer/Footer'
import { Header } from '@/components/blocks/Header/Header'

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const payload = await getPayload({ config: configPromise })

  // Payload сам вернет нужные строки для указанной локали
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
        {/* Передаем данные через деструктуризацию + пропс locale */}
        <Header {...headerData} locale={locale} />
        <main>{children}</main>
        <Footer {...footerData} locale={locale} />
      </body>
    </html>
  )
}
