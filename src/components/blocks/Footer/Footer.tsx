// 'use client'
// import React from 'react'
// import Link from 'next/link' // Исправлено для навигации
// import { Facebook, Youtube, Instagram, Mail, Phone, MapPin, Clock } from 'lucide-react'
// import styles from './Footer.module.scss'

// interface FooterProps {
//   description?: string
//   phone?: string
//   email?: string
//   address?: string
//   hours?: string
//   socials?: {
//     facebook?: string
//     youtube?: string
//     instagram?: string
//   }
// }

// export function Footer(data: FooterProps) {
//   return (
//     <footer className={styles.footer}>
//       <div className={styles.container}>
//         <div className={styles.grid}>
//           {/* Logo and Description */}
//           <div>
//             <div className={styles.logoBlock}>
//               <div className={styles.logoText}>NEW WAY</div>
//               <div className={styles.logoSub}>TRAVEL</div>
//             </div>
//             <p className={styles.description}>{data.description}</p>
//           </div>

//           {/* Menu */}
//           <div>
//             <h3 className={styles.heading}>Меню</h3>
//             <nav className={styles.nav}>
//               <Link href="/" className={styles.navLink}>
//                 Головна
//               </Link>
//               <Link href="/tours" className={styles.navLink}>
//                 Календар турів
//               </Link>
//               <Link href="/about" className={styles.navLink}>
//                 Про нас
//               </Link>
//               <Link href="/photos" className={styles.navLink}>
//                 Фотозвіти
//               </Link>
//             </nav>
//           </div>

//           {/* Contact */}
//           <div>
//             <h3 className={styles.heading}>Зворотній зв'язок</h3>
//             <div className={styles.contact}>
//               {data.phone && (
//                 <a href={`tel:${data.phone}`} className={styles.contactItem}>
//                   <Phone className={styles.icon} />
//                   <span>{data.phone}</span>
//                 </a>
//               )}
//               {data.email && (
//                 <a href={`mailto:${data.email}`} className={styles.contactItem}>
//                   <Mail className={styles.icon} />
//                   <span>{data.email}</span>
//                 </a>
//               )}
//               <div className={styles.contactItem}>
//                 <MapPin className={styles.icon} />
//                 <span>{data.address}</span>
//               </div>
//               <div className={styles.contactItem}>
//                 <Clock className={styles.icon} />
//                 <span>{data.hours}</span>
//               </div>
//             </div>
//           </div>

//           {/* Social Media */}
//           <div>
//             <h3 className={styles.heading}>Соціальні мережі</h3>
//             <div className={styles.socials}>
//               {data.socials?.facebook && (
//                 <a href={data.socials.facebook} target="_blank" className={styles.socialLink}>
//                   <Facebook className={styles.socialIcon} />
//                 </a>
//               )}
//               {data.socials?.youtube && (
//                 <a href={data.socials.youtube} target="_blank" className={styles.socialLink}>
//                   <Youtube className={styles.socialIcon} />
//                 </a>
//               )}
//               {data.socials?.instagram && (
//                 <a href={data.socials.instagram} target="_blank" className={styles.socialLink}>
//                   <Instagram className={styles.socialIcon} />
//                 </a>
//               )}
//             </div>
//           </div>
//         </div>

//         <div className={styles.copyright}>
//           © {new Date().getFullYear()} New Way Travel. Всі права захищені.
//         </div>
//       </div>
//     </footer>
//   )
// }
// src/components/blocks/Footer/Footer.tsx
'use client'
import React from 'react'
import Link from 'next/link'
import { Facebook, Youtube, Instagram, Mail, Phone, MapPin, Clock } from 'lucide-react'
import styles from './Footer.module.scss'

// Добавляем | null, чтобы типы совпадали с данными из базы Payload
interface FooterProps {
  description?: string | null
  phone?: string | null
  email?: string | null
  address?: string | null
  hours?: string | null
  socials?: {
    facebook?: string | null
    youtube?: string | null
    instagram?: string | null
  } | null
}

export function Footer(data: FooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Logo and Description */}
          <div>
            <div className={styles.logoBlock}>
              <div className={styles.logoText}>NEW WAY</div>
              <div className={styles.logoSub}>TRAVEL</div>
            </div>
            {/* Используем || '', чтобы не выводить null в DOM */}
            <p className={styles.description}>{data.description || ''}</p>
          </div>

          {/* Menu */}
          <div>
            <h3 className={styles.heading}>Меню</h3>
            <nav className={styles.nav}>
              <Link href="/" className={styles.navLink}>
                Головна
              </Link>
              <Link href="/tours" className={styles.navLink}>
                Календар турів
              </Link>
              <Link href="/about" className={styles.navLink}>
                Про нас
              </Link>
              <Link href="/photos" className={styles.navLink}>
                Фотозвіти
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className={styles.heading}>Зворотній зв'язок</h3>
            <div className={styles.contact}>
              {data.phone && (
                <a href={`tel:${data.phone}`} className={styles.contactItem}>
                  <Phone className={styles.icon} />
                  <span>{data.phone}</span>
                </a>
              )}
              {data.email && (
                <a href={`mailto:${data.email}`} className={styles.contactItem}>
                  <Mail className={styles.icon} />
                  <span>{data.email}</span>
                </a>
              )}
              {data.address && (
                <div className={styles.contactItem}>
                  <MapPin className={styles.icon} />
                  <span>{data.address}</span>
                </div>
              )}
              {data.hours && (
                <div className={styles.contactItem}>
                  <Clock className={styles.icon} />
                  <span>{data.hours}</span>
                </div>
              )}
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className={styles.heading}>Соціальні мережі</h3>
            <div className={styles.socials}>
              {data.socials?.facebook && (
                <a href={data.socials.facebook} target="_blank" className={styles.socialLink}>
                  <Facebook className={styles.socialIcon} />
                </a>
              )}
              {data.socials?.youtube && (
                <a href={data.socials.youtube} target="_blank" className={styles.socialLink}>
                  <Youtube className={styles.socialIcon} />
                </a>
              )}
              {data.socials?.instagram && (
                <a href={data.socials.instagram} target="_blank" className={styles.socialLink}>
                  <Instagram className={styles.socialIcon} />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className={styles.copyright}>
          © {new Date().getFullYear()} New Way Travel. Всі права захищені.
        </div>
      </div>
    </footer>
  )
}
