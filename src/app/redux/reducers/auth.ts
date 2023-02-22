const initState = { currentUser: null }

const authReducer = (state = initState, action: any) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        currentUser: action.payload.user,
      }
    default:
      return state
  }
}

export default authReducer
