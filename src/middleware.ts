import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['uk', 'en', 'ru']
const defaultLocale = 'uk'

export function middleware(request: NextRequest) {
  let { pathname } = request.nextUrl

  // Проверяем, есть ли локаль в начале пути
  const matchedLocale = locales.find(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  )

  if (matchedLocale) return

  // Если локаль не указана — добавляем дефолтную
  // Убираем возможный ведущий слэш для корректного объединения
  pathname = pathname.startsWith('/') ? pathname : `/${pathname}`

  request.nextUrl.pathname = `/${defaultLocale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|admin|favicon.ico|next.svg|vercel.svg).*)'],
}
