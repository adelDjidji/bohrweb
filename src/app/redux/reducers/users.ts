const initState = { list: [], loading:false, error:null }

const usersReducer = (state = initState, action: any) => {
  switch (action.type) {
    case "LOAD_USERS":
      return {
        ...state,
        loading: true,
      }
    case "LOAD_USERS_SUCCESS":
      return {
        ...state,
        list: action.payload,
        loading: false,
      }
    case "LOAD_USERS_ERROR":
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    default:
      return state
  }
}

export default usersReducer
