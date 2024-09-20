export const getDate = () => {
  const formatedDate = () => {
    const date = new Date()
    const formatear =
      ('0' + date.getDate()).slice(-2) +
      '-' +
      ('0' + (date.getMonth() + 1)).slice(-2) +
      '-' +
      date.getFullYear() +
      ' ' +
      ('0' + date.getHours()).slice(-2) +
      ':' +
      ('0' + date.getMinutes()).slice(-2) +
      ':' +
      ('0' + date.getSeconds()).slice(-2)
    // Mostramos la fecha y hora en la consola
    console.log(formatear)

    return formatear
  }
}
