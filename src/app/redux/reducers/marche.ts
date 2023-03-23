const initState = { loading: false, data:null, error: null }

const marcheReducer = (state = initState, action: any) => {
  switch (action.type) {
    case "LOAD_MARCHE":
      return {
        ...state,
        loading: true,
      }
    case "LOAD_MARCHE_SUCCESS":
      return {
        ...state,
        data: action.payload,
        loading: false,
      }
    case "LOAD_MARCHE_ERROR":
      return {
        ...state,
        loading: false,
        error:action.payload
      }
    default:
      return state
  }
}

export default marcheReducer
