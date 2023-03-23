const initState = { loading: false, data:null, error: null }

const sitesReducer = (state = initState, action: any) => {
  switch (action.type) {
    case "LOAD_SITES_DETAIL":
      return {
        ...state,
        loading: true,
      }
    case "LOAD_SITES_DETAIL_SUCCESS":
      return {
        ...state,
        data: action.payload,
        loading: false,
      }
    case "LOAD_SITES_DETAIL_ERROR":
      return {
        ...state,
        loading: false,
        error:action.payload
      }
    default:
      return state
  }
}

export default sitesReducer
