const initState = { loading: false, data:null, error: null }

const dashboardReducer = (state = initState, action: any) => {
  switch (action.type) {
    case "LOAD_DASHBOARD":
      return {
        ...state,
        loading: true,
      }
    case "LOAD_DASHBOARD_SUCCESS":
      return {
        ...state,
        data: action.payload,
        loading: false,
      }
    case "LOAD_DASHBOARD_ERROR":
      return {
        ...state,
        loading: false,
        error:action.payload
      }
    default:
      return state
  }
}

export default dashboardReducer
