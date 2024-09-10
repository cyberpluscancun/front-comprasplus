export const formatDate = (dateString) => {
  const date = new Date(dateString)

  const formattedDate = new Date(dateString)
    .toLocaleDateString('es-MX', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
    .replace(/\//g, '/') // Cambia el formato a yyyy/mm/dd

  const formattedTime = date.toLocaleTimeString('es-MX', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  })

  return `${formattedDate} ${formattedTime}`
}
