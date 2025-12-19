// import React from 'react'
// import './styles.css'
// import { Footer } from '@/components/blocks/Footer/Footer'

// export const metadata = {
//   description: 'A blank template using Payload in a Next.js app.',
//   title: 'Payload Blank Template',
// }

// export default async function RootLayout(props: { children: React.ReactNode }) {
//   const { children } = props

//   return (
//     <html lang="en">
//       <body>
//         <main>{children}</main>
//         <Footer {...footerData} />
//       </body>
//     </html>
//   )
// }
// src/app/(frontend)/layout.tsx
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Footer } from '@/components/blocks/Footer/Footer'
import { Header } from '@/components/blocks/Header/Header'

// src/app/(frontend)/layout.tsx
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const payload = await getPayload({ config: configPromise })

  // Получаем данные отдельно для каждого глобала
  const headerData = await payload.findGlobal({ slug: 'header' })
  const footerData = await payload.findGlobal({ slug: 'footer' })

  return (
    <html lang="uk">
      <body>
        <Header {...headerData} />
        <main>{children}</main>
        <Footer {...footerData} />
      </body>
    </html>
  )
}
