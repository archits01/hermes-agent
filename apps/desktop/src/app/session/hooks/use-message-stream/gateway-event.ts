// Keep the legacy file import path pointed at the extracted gateway-event
// dispatcher. The sibling directory owns the per-family handlers; this shim
// prevents the file from shadowing `gateway-event/index.ts`.
export * from './gateway-event/index'
