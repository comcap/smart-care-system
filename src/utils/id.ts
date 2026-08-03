export const generateId = (): string => {
  return `sc-${Math.random().toString(36).slice(2, 8)}`
}
