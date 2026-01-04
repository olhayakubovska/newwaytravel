// 'use client'

// import React, { useState, useEffect } from 'react'
// import Link from 'next/link'
// import { useRouter, usePathname } from 'next/navigation'
// import styles from './Header.module.scss'
// import { Globe, MessageCircle, Facebook, Youtube, Instagram, Send, Menu, X } from 'lucide-react'

// interface HeaderProps {
//   data?: any
//   locale: string
// }

// export const Header = ({ data, locale }: HeaderProps) => {
//   const router = useRouter()
//   const pathname = usePathname()
//   const [localeOpen, setLocaleOpen] = useState(false)
//   const [isMenuOpen, setIsMenuOpen] = useState(false)

//   // Универсальный перевод
//   const t = (field: any, fallback: string): string => {
//     if (!field) return fallback
//     if (typeof field === 'object') {
//       return field[locale] || field.uk || field.en || Object.values(field)[0] || fallback
//     }
//     return typeof field === 'string' ? field : fallback
//   }

//   // Блокировка скролла при открытом меню
//   useEffect(() => {
//     if (isMenuOpen) {
//       document.body.style.overflow = 'hidden'
//     } else {
//       document.body.style.overflow = 'unset'
//     }
//   }, [isMenuOpen])

//   // Закрытие меню при смене страницы
//   useEffect(() => {
//     setIsMenuOpen(false)
//   }, [pathname])

//   const changeLanguage = (newLocale: string) => {
//     if (newLocale === locale) return
//     const segments = pathname.split('/')
//     segments[1] = newLocale
//     const newPath = segments.join('/')
//     router.push(newPath)
//     setLocaleOpen(false)
//   }

//   const navigation = data?.navItems || []

//   return (
//     <>
//       <header className={styles.header}>
//         <div className={styles.container}>
//           <Link href={`/${locale}`} className={styles.logo}>
//             {t(data?.logoText, 'NEW WAY')}
//           </Link>

//           {/* Desktop Nav */}
//           <nav className={styles.nav}>
//             {navigation.map((item: any, idx: number) => (
//               <Link key={idx} href={`/${locale}${item.link}`} className={styles.navLink}>
//                 {t(item.label, '')}
//               </Link>
//             ))}
//           </nav>

//           <div className={styles.actions}>
//             {/* Desktop Chat */}
//             <a
//               href={data?.telegramChatLink || '#'}
//               target="_blank"
//               className={styles.chatLinkDesktop}
//             >
//               <button className={styles.chatButton}>
//                 <MessageCircle size={18} />
//                 <span className={styles.chatText}>{t(data?.chatText, 'ЧАТ')}</span>
//               </button>
//             </a>

//             {/* Language Switcher */}
//             <div className={styles.localeWrapper}>
//               <button className={styles.localeButton} onClick={() => setLocaleOpen(!localeOpen)}>
//                 <span className={styles.localeText}>{locale}</span>
//                 <Globe className={styles.iconSmall} />
//               </button>
//               {localeOpen && (
//                 <div className={styles.dropdownContent}>
//                   {['uk', 'en', 'ru'].map((lang) => (
//                     <div
//                       key={lang}
//                       className={styles.dropdownItem}
//                       onClick={() => changeLanguage(lang)}
//                     >
//                       {lang.toUpperCase()}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Burger Button */}
//             <button className={styles.burgerBtn} onClick={() => setIsMenuOpen(true)}>
//               <Menu size={28} />
//             </button>
//           </div>

//           {/* Socials Desktop */}
//           <div className={styles.socialsLeft}>
//             {data?.socialLinks?.facebook && (
//               <a href={data.socialLinks.facebook} target="_blank">
//                 <Facebook className={styles.icon} />
//               </a>
//             )}
//             {data?.socialLinks?.youtube && (
//               <a href={data.socialLinks.youtube} target="_blank">
//                 <Youtube className={styles.icon} />
//               </a>
//             )}
//             {data?.socialLinks?.telegram && (
//               <a href={data.socialLinks.telegram} target="_blank">
//                 <Send className={styles.icon} />
//               </a>
//             )}
//             {data?.socialLinks?.instagram && (
//               <a href={data.socialLinks.instagram} target="_blank">
//                 <Instagram className={styles.icon} />
//               </a>
//             )}
//           </div>
//         </div>
//       </header>

//       {/* FULLSCREEN MOBILE MENU */}
//       <div className={`${styles.mobileOverlay} ${isMenuOpen ? styles.active : ''}`}>
//         <div className={styles.mobileHeader}>
//           <div className={styles.logo}>{t(data?.logoText, 'NEW WAY')}</div>
//           <button className={styles.closeBtn} onClick={() => setIsMenuOpen(false)}>
//             <X size={32} />
//           </button>
//         </div>

//         <nav className={styles.mobileNav}>
//           {navigation.map((item: any, idx: number) => (
//             <Link
//               key={idx}
//               href={`/${locale}${item.link}`}
//               className={styles.mobileLink}
//               onClick={() => setIsMenuOpen(false)}
//             >
//               {t(item.label, '')}
//             </Link>
//           ))}
//         </nav>

//         <div className={styles.mobileFooter}>
//           <a href={data?.telegramChatLink || '#'} className={styles.mobileChatBtn} target="_blank">
//             <MessageCircle size={22} />
//             {t(data?.chatText, 'ОНЛАЙН ЧАТ')}
//           </a>

//           <div className={styles.mobileSocials}>
//             {data?.socialLinks?.facebook && (
//               <a href={data.socialLinks.facebook} target="_blank">
//                 <Facebook size={24} />
//               </a>
//             )}
//             {data?.socialLinks?.instagram && (
//               <a href={data.socialLinks.instagram} target="_blank">
//                 <Instagram size={24} />
//               </a>
//             )}
//             {data?.socialLinks?.telegram && (
//               <a href={data.socialLinks.telegram} target="_blank">
//                 <Send size={24} />
//               </a>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }
'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import styles from './Header.module.scss'
import { Globe, MessageCircle, Facebook, Youtube, Instagram, Send, Menu, X } from 'lucide-react'

interface HeaderProps {
  data?: any
  locale: string
}

export const Header = ({ data, locale }: HeaderProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const [localeOpen, setLocaleOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const t = (field: any, fallback: string): string => {
    if (!field) return fallback
    if (typeof field === 'object') {
      return field[locale] || field.uk || field.en || Object.values(field)[0] || fallback
    }
    return typeof field === 'string' ? field : fallback
  }

  // Скролл РАЗРЕШЕН (блокировка закомментирована по вашему запросу)
  /*
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])
  */

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  const changeLanguage = (newLocale: string) => {
    if (newLocale === locale) return
    const segments = pathname.split('/')
    segments[1] = newLocale
    const newPath = segments.join('/')
    router.push(newPath)
    setLocaleOpen(false)
  }

  const navigation = data?.navItems || []

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <Link href={`/${locale}`} className={styles.logo}>
            {t(data?.logoText, 'NEW WAY')}
          </Link>

          <nav className={styles.nav}>
            {navigation.map((item: any, idx: number) => (
              <Link key={idx} href={`/${locale}${item.link}`} className={styles.navLink}>
                {t(item.label, '')}
              </Link>
            ))}
          </nav>

          <div className={styles.actions}>
            <a
              href={data?.telegramChatLink || '#'}
              target="_blank"
              className={styles.chatLinkDesktop}
            >
              <button className={styles.chatButton}>
                <MessageCircle size={18} />
                <span>{t(data?.chatText, 'ЧАТ')}</span>
              </button>
            </a>

            <div className={styles.localeWrapper}>
              <button className={styles.localeButton} onClick={() => setLocaleOpen(!localeOpen)}>
                {locale} <Globe size={14} />
              </button>
              {localeOpen && (
                <div className={styles.dropdownContent}>
                  {['uk', 'en', 'ru'].map((lang) => (
                    <div
                      key={lang}
                      className={styles.dropdownItem}
                      onClick={() => changeLanguage(lang)}
                    >
                      {lang.toUpperCase()}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button className={styles.burgerBtn} onClick={() => setIsMenuOpen(true)}>
              <Menu size={28} />
            </button>
          </div>
        </div>
      </header>

      {/* ПРОЗРАЧНОЕ МОБИЛЬНОЕ МЕНЮ */}
      <div className={`${styles.mobileOverlay} ${isMenuOpen ? styles.active : ''}`}>
        <div className={styles.mobileHeader}>
          <div className={styles.logo}>{t(data?.logoText, 'NEW WAY')}</div>
          <button className={styles.closeBtn} onClick={() => setIsMenuOpen(false)}>
            <X size={32} />
          </button>
        </div>

        <nav className={styles.mobileNav}>
          {navigation.map((item: any, idx: number) => (
            <Link key={idx} href={`/${locale}${item.link}`} className={styles.mobileLink}>
              {t(item.label, '')}
            </Link>
          ))}
        </nav>

        <div className={styles.mobileFooter}>
          <a href={data?.telegramChatLink || '#'} className={styles.mobileChatBtn} target="_blank">
            <MessageCircle size={22} />
            {t(data?.chatText, 'ОНЛАЙН ЧАТ')}
          </a>
          <div className={styles.mobileSocials}>
            {data?.socialLinks?.facebook && (
              <a href={data.socialLinks.facebook} target="_blank">
                <Facebook size={24} />
              </a>
            )}
            {data?.socialLinks?.instagram && (
              <a href={data.socialLinks.instagram} target="_blank">
                <Instagram size={24} />
              </a>
            )}
            {data?.socialLinks?.telegram && (
              <a href={data.socialLinks.telegram} target="_blank">
                <Send size={24} />
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
