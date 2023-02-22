const initState = { loading: false, data:null, error: null }

const forecastReducer = (state = initState, action: any) => {
  switch (action.type) {
    case "LOAD_FORECAST":
      return {
        ...state,
        loading: true,
      }
    case "LOAD_FORECAST_SUCCESS":
      return {
        ...state,
        data: action.payload,
        loading: false,
      }
    case "LOAD_FORECAST_ERROR":
      return {
        ...state,
        loading: false,
        error:action.payload
      }
    default:
      return state
  }
}

export default forecastReducer
