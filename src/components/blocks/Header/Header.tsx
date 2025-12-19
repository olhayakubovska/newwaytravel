// // src/components/blocks/Header/Header.tsx
// 'use client'

// import React from 'react'
// import Link from 'next/link'
// import styles from './Header.module.scss'
// import { Globe, MessageCircle, Facebook, Youtube, Instagram } from 'lucide-react'
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from '@radix-ui/react-dropdown-menu'
// import { useLocaleStore } from '@/stores/LocaleStore'

// // 1. Описываем пропсы (учитываем null из базы)
// interface HeaderProps {
//   logoText?: string | null
//   navItems?:
//     | {
//         label: string
//         link: string
//         id?: string | null
//       }[]
//     | null
// }

// export const Header = (data: HeaderProps) => {
//   const { locale, setLocale } = useLocaleStore()

//   // 2. Если данных в админке нет, используем пустой массив
//   const navigation = data.navItems || []

//   return (
//     <header className={styles.header}>
//       <div className={styles.container}>
//         <Link href="/" className={styles.logo}>
//           {data.logoText || 'NEW WAY'}
//         </Link>

//         <nav className={styles.nav}>
//           {navigation.map((item) => (
//             <Link key={item.id || item.link} href={item.link} className={styles.navLink}>
//               {item.label}
//             </Link>
//           ))}
//         </nav>

//         <div className={styles.actions}>
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <button className={styles.localeButton}>
//                 <Globe className={styles.icon} />
//                 <span className={styles.localeText}>{locale}</span>
//               </button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent className={styles.dropdownContent} align="end">
//               <DropdownMenuItem className={styles.dropdownItem} onClick={() => setLocale('ua')}>
//                 Українська
//               </DropdownMenuItem>
//               <DropdownMenuItem className={styles.dropdownItem} onClick={() => setLocale('en')}>
//                 English
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>

//           <button className={styles.chatButton}>
//             <MessageCircle className={styles.icon} />
//             <span className={styles.chatText}>Онлайн чат</span>
//           </button>

//           <div className={styles.socials}>
//             <Facebook className={styles.icon} />
//             <Youtube className={styles.icon} />
//             <Instagram className={styles.icon} />
//           </div>
//         </div>
//       </div>
//     </header>
//   )
// }
'use client'

import React from 'react'
import Link from 'next/link'
import styles from './Header.module.scss'
import { Globe, MessageCircle, Facebook, Youtube, Instagram } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu'
import { useLocaleStore } from '@/stores/LocaleStore'

interface HeaderProps {
  logoText?: string | null
  navItems?:
    | {
        label: string
        link: string
        id?: string | null
      }[]
    | null
}

export const Header = (data: HeaderProps) => {
  const { locale, setLocale } = useLocaleStore()
  const navigation = data.navItems || []

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Логотип */}
        <Link href="/" className={styles.logo}>
          {data.logoText || 'NEW WAY'}
        </Link>

        {/* Навигация (скрыта на мобилках через CSS) */}
        <nav className={styles.nav}>
          {navigation.map((item) => (
            <Link key={item.id || item.link} href={item.link} className={styles.navLink}>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Блок действий (Языки, Чат, Соцсети) */}
        <div className={styles.actions}>
          {/* Выбор языка */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className={styles.localeButton}>
                <Globe className={styles.icon} />
                <span className={styles.localeText}>{locale}</span>
              </button>
            </DropdownMenuTrigger>

            {/* Добавил базовые стили для выпадающего списка, чтобы он не "разваливался" */}
            <DropdownMenuContent
              className={styles.dropdownContent}
              align="end"
              style={{
                background: 'white',
                padding: '8px',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                zIndex: 100,
              }}
            >
              <DropdownMenuItem
                style={{ cursor: 'pointer', padding: '4px 8px' }}
                onClick={() => setLocale('ua')}
              >
                Українська
              </DropdownMenuItem>
              <DropdownMenuItem
                style={{ cursor: 'pointer', padding: '4px 8px' }}
                onClick={() => setLocale('en')}
              >
                English
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Кнопка чата */}
          <button
            className={styles.chatButton}
            style={{ padding: '8px 16px', border: 'none', cursor: 'pointer' }}
          >
            <MessageCircle className={styles.icon} />
            <span className={styles.chatText}>Онлайн чат</span>
          </button>

          {/* Соцсети (скрыты на мобилках через CSS) */}
          <div className={styles.socials}>
            <button
              className={styles.socialButton}
              style={{ border: 'none', background: 'none', cursor: 'pointer' }}
            >
              <Facebook className={styles.icon} />
            </button>
            <button
              className={styles.socialButton}
              style={{ border: 'none', background: 'none', cursor: 'pointer' }}
            >
              <Youtube className={styles.icon} />
            </button>
            <button
              className={styles.socialButton}
              style={{ border: 'none', background: 'none', cursor: 'pointer' }}
            >
              <Instagram className={styles.icon} />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
