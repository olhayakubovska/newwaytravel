'use client'
import { useState } from 'react'
import styles from './BookingModal.module.scss'

interface BookingModalProps {
  tourName: string
  onClose: () => void
}

export function BookingModal({ tourName, onClose }: BookingModalProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')

    const formData = new FormData(e.currentTarget)

    // Собираем данные. tourName берется из пропсов, которые пришли из TourDetailClient
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      guests: Number(formData.get('guests')),
      tourName: tourName, // Это значение уйдет в колонку tourName в Payload
    }

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>
          ✕
        </button>

        {status === 'success' ? (
          <div className={styles.successMessage}>
            <h2>Дякуємо!</h2>
            <p>
              Ваша заявка на тур <strong>{tourName}</strong> прийнята. Ми зв’яжемося з вами
              найближчим часом.
            </p>
            <button className={styles.submitBtn} onClick={onClose}>
              Закрити
            </button>
          </div>
        ) : (
          <>
            <h2 className={styles.title}>Забронювати тур</h2>
            <p className={styles.tourSubtitle}>
              Ви обрали: <strong>{tourName}</strong>
            </p>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputGroup}>
                <input name="name" type="text" placeholder="Ваше ім'я" required />
              </div>
              <div className={styles.inputGroup}>
                <input name="email" type="email" placeholder="Email" required />
              </div>
              <div className={styles.inputGroup}>
                <input name="phone" type="tel" placeholder="Телефон" required />
              </div>
              <div className={styles.inputGroup}>
                <input name="guests" type="number" placeholder="Кількість людей" min="1" required />
              </div>

              <button type="submit" className={styles.submitBtn} disabled={status === 'loading'}>
                {status === 'loading' ? 'ВІДПРАВКА...' : 'ПІДТВЕРДИТИ БРОНЬ'}
              </button>

              {status === 'error' && (
                <p className={styles.errorText}>Помилка відправки. Спробуйте ще раз.</p>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  )
}
