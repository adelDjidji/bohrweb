export const setCurrentUser = (user: { name: string; role: string }|null) => ({
  type: "SET_USER",
  payload: {
    user,
  },
})
