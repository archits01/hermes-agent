import { chatMessageText } from './parts'
import type { ChatMessage } from './types'

function isProseOnlyAssistant(message: ChatMessage): boolean {
  return (
    message.role === 'assistant' &&
    !message.hidden &&
    message.parts.every(part => part.type === 'text' || part.type === 'reasoning')
  )
}

function assistantTextsAreSameReply(left: string, right: string): boolean {
  const a = left.trim()
  const b = right.trim()

  return Boolean(a && b && (a === b || b.startsWith(a) || a.startsWith(b)))
}

/** Collapse duplicate interim/final prose replies in both live and resumed views. */
export function collapseDuplicateAssistantReplies(messages: ChatMessage[]): ChatMessage[] {
  const next: ChatMessage[] = []

  for (const message of messages) {
    if (message.hidden || message.role !== 'assistant') {
      next.push(message)
      continue
    }

    let previousVisibleIndex = -1
    for (let index = next.length - 1; index >= 0; index -= 1) {
      if (!next[index].hidden) {
        previousVisibleIndex = index
        break
      }
    }

    const previous = previousVisibleIndex >= 0 ? next[previousVisibleIndex] : undefined
    if (
      previous &&
      isProseOnlyAssistant(previous) &&
      assistantTextsAreSameReply(chatMessageText(previous), chatMessageText(message))
    ) {
      next[previousVisibleIndex] = message
      continue
    }

    next.push(message)
  }

  return next
}
