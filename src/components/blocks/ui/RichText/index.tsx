import React, { JSX } from 'react'

interface RichTextProps {
  content: any
  className?: string
}

export const RichText: React.FC<RichTextProps> = ({ content, className }) => {
  if (!content || !content.root) return null

  // Рекурсивная функция для превращения JSON в HTML
  const serialize = (nodes: any[]): JSX.Element[] => {
    return nodes.map((node, index) => {
      // 1. Обработка обычного текста
      if (node.type === 'text') {
        let text: React.ReactNode = node.text

        // Форматирование Lexical использует битовые маски:
        // 1 = Bold, 2 = Italic, 8 = Underline
        if (node.format & 1) text = <strong key={index}>{text}</strong>
        if (node.format & 2) text = <em key={index}>{text}</em>
        if (node.format & 8) text = <u key={index}>{text}</u>

        return <span key={index}>{text}</span>
      }

      if (!node) return <React.Fragment key={index} />

      // 2. Обработка блоков
      switch (node.type) {
        case 'root':
          return <div key={index}>{serialize(node.children)}</div>

        case 'paragraph':
          return <p key={index}>{serialize(node.children)}</p>

        case 'heading': {
          const Tag = node.tag as keyof JSX.IntrinsicElements
          return <Tag key={index}>{serialize(node.children)}</Tag>
        }

        case 'list': {
          const ListTag = node.listType === 'bullet' ? 'ul' : 'ol'
          return <ListTag key={index}>{serialize(node.children)}</ListTag>
        }

        case 'listitem':
          return <li key={index}>{serialize(node.children)}</li>

        case 'link':
          return (
            <a
              key={index}
              href={node.fields?.url}
              target={node.fields?.newTab ? '_blank' : '_self'}
              rel="noopener noreferrer"
            >
              {serialize(node.children)}
            </a>
          )

        // Если тип узла неизвестен, просто рендерим его детей
        default:
          return <div key={index}>{node.children ? serialize(node.children) : null}</div>
      }
    })
  }

  return <div className={className}>{serialize(content.root.children)}</div>
}
