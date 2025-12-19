// // 'use client'
// // import { useState } from 'react'
// // import styles from './BookingModal.module.scss'

// // export function BookingModal({ tourName, onClose }: { tourName: string, onClose: () => void }) {
// //   const [loading, setLoading] = useState(false)
// //   const [sent, setSent] = useState(false)

// //   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
// //     e.preventDefault()
// //     setLoading(true)

// //     const formData = new FormData(e.currentTarget)
// //     const data = {
// //       name: formData.get('name'),
// //       email: formData.get('email'),
// //       phone: formData.get('phone'),
// //       guests: formData.get('guests'),
// //       tourName: tourName,
// //     }

// //     try {
// //       const res = await fetch('/api/orders', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify(data),
// //       })
// //       if (res.ok) setSent(true)
// //     } catch (err) {
// //       alert('Помилка при відправці.')
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   return (
// //     <div className={styles.overlay} onClick={onClose}>
// //       <div className={styles.modal} onClick={e => e.stopPropagation()}>
// //         <button className={styles.closeBtn} onClick={onClose}>✕</button>

// //         {sent ? (
// //           <div className={styles.success}>
// //             <h2>Дякуємо!</h2>
// //             <p>Ми зв'яжемося з вами найближчим часом.</p>
// //           </div>
// //         ) : (
// //           <>
// //             <h2 className={styles.title}>Забронювати тур</h2>
// //             <p className={styles.tourName}>“{tourName}”</p>

// //             <form onSubmit={handleSubmit} className={styles.form}>
// //               <input name="name" placeholder="Ім'я" required />
// //               <input name="email" type="email" placeholder="Email" required />
// //               <input name="phone" type="tel" placeholder="+380-00-000-0000" required />
// //               <input name="guests" type="number" placeholder="Кількість місць" min="1" required />
// //               <button type="submit" className={styles.submitBtn} disabled={loading}>
// //                 {loading ? 'ВІДПРАВКА...' : 'ЗАБРОНЮВАТИ'}
// //               </button>
// //             </form>
// //           </>
// //         )}
// //       </div>
// //     </div>
// //   )
// // }

// 'use client'
// import { useState } from 'react'

// export function BookingModal({ tourName, onClose }: { tourName: string; onClose: () => void }) {
//   const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()
//     setStatus('loading')

//     const formData = new FormData(e.currentTarget)
//     const data = {
//       name: formData.get('name'),
//       email: formData.get('email'),
//       phone: formData.get('phone'),
//       guests: Number(formData.get('guests')),
//       tourName: tourName, // Автоматически добавляем название тура
//     }

//     try {
//       // Стандартный путь к API Payload для создания записи в коллекции orders
//       const res = await fetch('/api/orders', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(data),
//       })

//       if (res.ok) {
//         setStatus('success')
//       } else {
//         setStatus('error')
//       }
//     } catch (err) {
//       console.error(err)
//       setStatus('error')
//     }
//   }

//   if (status === 'success') {
//     return (
//       <div className="modal-success">
//         <h3>Дякуємо, {tourName} заброньовано!</h3>
//         <p>Ми зв’яжемося з вами найближчим часом.</p>
//         <button onClick={onClose}>Закрити</button>
//       </div>
//     )
//   }

//   return (
//     <div className="modal-overlay">
//       <form onSubmit={handleSubmit}>
//         <input name="name" type="text" placeholder="Ваше ім'я" required />
//         <input name="email" type="email" placeholder="Email" required />
//         <input name="phone" type="tel" placeholder="Телефон" required />
//         <input name="guests" type="number" placeholder="Кількість людей" required />

//         <button type="submit" disabled={status === 'loading'}>
//           {status === 'loading' ? 'Відправка...' : 'ЗАБРОНЮВАТИ'}
//         </button>
//         {status === 'error' && <p style={{ color: 'red' }}>Помилка відправки. Спробуйте ще раз.</p>}
//       </form>
//     </div>
//   )
// }

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
              Ваша заявка на тур <strong>"{tourName}"</strong> прийнята. Ми зв’яжемося з вами
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
