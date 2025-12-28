'use client'

import React, { useState } from 'react'
import { X } from 'lucide-react'
import styles from './ConsultationModal.module.scss'

interface ConsultationModalProps {
  onClose: () => void
  locale: 'uk' | 'en' | 'ru'
}

export function ConsultationModal({ onClose, locale }: ConsultationModalProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const i18n = {
    title: locale === 'en' ? 'Free consultation' : 'Безкоштовна консультація',
    name: locale === 'en' ? 'Name' : "Ім'я",
    phone: locale === 'en' ? 'Phone' : 'Телефон',
    email: locale === 'en' ? 'Email' : 'Email',
    question: locale === 'en' ? 'Ask your question' : 'Поставте ваше запитання',
    submit: locale === 'en' ? 'ASK A QUESTION' : 'ПОСТАВИТИ ПИТАННЯ',
    successTitle: locale === 'en' ? 'Thank you!' : 'Дякуємо!',
    successText:
      locale === 'en'
        ? 'Your request has been sent. We will contact you soon.'
        : 'Ваше запитання відправлено. Ми зв’яжемося з вами найближчим часом.',
    errorText: locale === 'en' ? 'Error. Try again.' : 'Помилка. Спробуйте ще раз.',
    close: locale === 'en' ? 'Close' : 'Закрити',
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')

    const formData = new FormData(e.currentTarget)

    const data = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      message: formData.get('message'),
    }

    try {
      const res = await fetch('/api/consultations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        setStatus('success')
        setTimeout(() => onClose(), 5000)
      } else {
        setStatus('error')
      }
    } catch (err) {
      console.error('Network error:', err)
      setStatus('error')
    }
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>
          <X size={24} />
        </button>

        {status === 'success' ? (
          <div className={styles.successWrapper}>
            <h2>{i18n.successTitle}</h2>
            <p>{i18n.successText}</p>
            <button className={styles.submitBtn} onClick={onClose}>
              {i18n.close}
            </button>
          </div>
        ) : (
          <>
            <h2 className={styles.title}>{i18n.title}</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputGroup}>
                <input name="name" type="text" placeholder={i18n.name} required />
              </div>
              <div className={styles.inputGroup}>
                <input name="phone" type="tel" placeholder="+380-00-000-0000" required />
              </div>
              <div className={styles.inputGroup}>
                <input name="email" type="email" placeholder={i18n.email} required />
              </div>
              <div className={styles.inputGroup}>
                <textarea name="message" placeholder={i18n.question} rows={4} />
              </div>

              <button type="submit" className={styles.submitBtn} disabled={status === 'loading'}>
                {status === 'loading' ? '...' : i18n.submit}
              </button>

              {status === 'error' && <p className={styles.errorText}>{i18n.errorText}</p>}
            </form>
          </>
        )}
      </div>
    </div>
  )
}
