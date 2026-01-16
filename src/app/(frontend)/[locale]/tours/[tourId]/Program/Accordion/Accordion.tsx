import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import styles from './accordion.module.css'

interface AccordionProps {
  type?: string
  collapsible?: boolean
  children: React.ReactNode
  className?: string
}

interface AccordionItemProps {
  value: string
  children: React.ReactNode
  className?: string
}

interface AccordionTriggerProps {
  children: React.ReactNode
  className?: string
  isOpen?: boolean
  setIsOpen?: (open: boolean) => void
}

interface AccordionContentProps {
  children: React.ReactNode
  className?: string
  isOpen?: boolean
}

export function Accordion({ children, className }: AccordionProps) {
  return <div className={`${styles.accordionContainer} ${className || ''}`}>{children}</div>
}

export function AccordionItem({ children, className }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={`${styles.item} ${className || ''}`}>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child as React.ReactElement<any>, { isOpen, setIsOpen })
          : child,
      )}
    </div>
  )
}

export function AccordionTrigger({
  children,
  className,
  isOpen,
  setIsOpen,
}: AccordionTriggerProps) {
  return (
    <button
      className={`${styles.trigger} ${isOpen ? styles.triggerOpen : ''} ${className || ''}`}
      onClick={() => setIsOpen?.(!isOpen)}
      data-state={isOpen ? 'open' : 'closed'}
    >
      {children}
      <ChevronDown className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`} />
    </button>
  )
}

export function AccordionContent({ children, className, isOpen }: AccordionContentProps) {
  return (
    <div className={`${styles.content} ${isOpen ? styles.contentOpen : ''}`}>
      <div className={className}>{children}</div>
    </div>
  )
}
