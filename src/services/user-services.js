export const fetchUsers = async () => {
  const response = await fetch('/src/assets/users.json')
  return response.json()
}

export const findUserById = (users, id) => users.find((user) => user.id === id)
