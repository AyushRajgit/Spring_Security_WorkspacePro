export function initials(person) {
  return `${person.firstName?.[0] || ''}${person.lastName?.[0] || ''}`.toUpperCase() || 'FH'
}

export function fullName(person) {
  return `${person.firstName || ''} ${person.lastName || ''}`.trim() || 'Unnamed hire'
}

export function personColor(person) {
  const colors = ['lilac', 'mint', 'peach', 'blue', 'rose', 'lime']
  const seed = `${person.firstName || ''}${person.lastName || ''}`
    .split('')
    .reduce((sum, char) => sum + char.charCodeAt(0), 0)

  return colors[seed % colors.length]
}
