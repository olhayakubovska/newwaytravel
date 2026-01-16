// 'use client'

// import { RichText } from '@/components/blocks/ui/RichText'
// import { motion } from 'framer-motion'
// import styles from './AdditionalInfoCard.module.css'

// interface AdditionalInfoCardProps {
//   title: string
//   content: any
//   className?: string // Дозволяємо передавати додаткові класи
// }

// export function AdditionalInfoCard({ title, content, className }: AdditionalInfoCardProps) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.5 }}
//       className={`${styles.card} ${className || ''}`}
//     >
//       <div className={styles.title}>{title}</div>
//       <div className={styles.richText}>
//         <RichText content={content} />
//       </div>
//     </motion.div>
//   )
// }
