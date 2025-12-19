'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, X } from 'lucide-react'
import styles from './VideoSection.module.scss'

interface VideoItem {
  id: string
  videoTitle?: string
  thumbnail: { url: string }
  videoFile: { url: string }
}

export function VideoSection({ title, items }: { title: string; items: VideoItem[] }) {
  const [playingId, setPlayingId] = useState<string | null>(null)

  const handleClose = () => setPlayingId(null)
  const currentVideo = items?.find((v) => v.id === playingId)

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={styles.header}
        >
          <h2 className={styles.title}>{title || 'Відео з наших мандрівок'}</h2>
        </motion.div>

        <div className={styles.grid}>
          {items?.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={styles.card}
              onClick={() => setPlayingId(item.id)}
            >
              <img
                src={item.thumbnail.url}
                alt={item.videoTitle || 'Travel Video'}
                className={styles.thumbnail}
              />
              <div className={styles.overlay} />
              <div className={styles.playWrapper}>
                <div className={styles.playButton}>
                  <Play className={styles.playIcon} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {currentVideo && (
        <div className={styles.modal} onClick={handleClose}>
          <video
            src={currentVideo.videoFile.url}
            controls
            autoPlay
            className={styles.videoPlayer}
            onClick={(e) => e.stopPropagation()}
          />
          <X size={32} color="white" className={styles.closeIcon} onClick={handleClose} />
        </div>
      )}
    </section>
  )
}
