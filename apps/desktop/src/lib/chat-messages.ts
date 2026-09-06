// Keep the legacy file import path pointed at the extracted chat-message barrel.
// The sibling directory is the source of truth; this shim prevents the file
// from shadowing `lib/chat-messages/index.ts` under Vite/Rolldown resolution.
export * from './chat-messages/index'
