const initState = { loading: false, data:null, error: null }

const analyseReducer = (state = initState, action: any) => {
  switch (action.type) {
    case "LOAD_ANALYSE":
      return {
        ...state,
        loading: true,
      }
    case "LOAD_ANALYSE_SUCCESS":
      return {
        ...state,
        data: action.payload,
        loading: false,
      }
    case "LOAD_ANALYSE_ERROR":
      return {
        ...state,
        loading: false,
        error:action.payload
      }
    default:
      return state
  }
}

export default analyseReducer
