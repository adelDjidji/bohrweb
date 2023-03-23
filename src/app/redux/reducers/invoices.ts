const initState = { loading: false, data:null, error: null }

const invoicesReducer = (state = initState, action: any) => {
  switch (action.type) {
    case "LOAD_INVOICES":
      return {
        ...state,
        loading: true,
      }
    case "LOAD_INVOICES_SUCCESS":
      return {
        ...state,
        data: action.payload,
        loading: false,
      }
    case "LOAD_INVOICES_ERROR":
      return {
        ...state,
        loading: false,
        error:action.payload
      }
    default:
      return state
  }
}

export default invoicesReducer
