export const captalize = (text) => {
  const initial = text.substring(0, 1).toUpperCase()
  return `${initial}${text.substring(1)}`
}
