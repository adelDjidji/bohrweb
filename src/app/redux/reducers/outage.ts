const initState = { loading: false, data:null, error: null }

const outageReducer = (state = initState, action: any) => {
  switch (action.type) {
    case "LOAD_OUTAGE":
      return {
        ...state,
        loading: true,
      }
    case "LOAD_OUTAGE_SUCCESS":
      return {
        ...state,
        data: action.payload,
        loading: false,
      }
    case "LOAD_OUTAGE_ERROR":
      return {
        ...state,
        loading: false,
        error:action.payload
      }
    default:
      return state
  }
}

export default outageReducer
