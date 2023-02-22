const initState = { loading: false, data:null, error: null }

const portfolioReducer = (state = initState, action: any) => {
  switch (action.type) {
    case "LOAD_PORTFOLIO":
      return {
        ...state,
        loading: true,
      }
    case "LOAD_PORTFOLIO_SUCCESS":
      return {
        ...state,
        data: action.payload,
        loading: false,
      }
    case "LOAD_PORTFOLIO_ERROR":
      return {
        ...state,
        loading: false,
        error:action.payload
      }
    default:
      return state
  }
}

export default portfolioReducer
