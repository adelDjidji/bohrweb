const initState = { loading: false, data:null, error: null }

const liveReducer = (state = initState, action: any) => {
  switch (action.type) {
    case "LOAD_LIVE":
      return {
        ...state,
        loading: true,
      }
    case "LOAD_LIVE_SUCCESS":
      return {
        ...state,
        data: action.payload,
        loading: false,
      }
    case "LOAD_LIVE_ERROR":
      return {
        ...state,
        loading: false,
        error:action.payload
      }
    default:
      return state
  }
}

export default liveReducer
