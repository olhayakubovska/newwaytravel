import { create } from 'zustand'

interface LocaleStore {
  locale: 'en' | 'ua' | 'ru'
  setLocale: (locale: 'en' | 'ua' | 'ru') => void
}

export const useLocaleStore = create<LocaleStore>((set) => ({
  locale: 'ua',
  setLocale: (locale) => set({ locale }),
}))
