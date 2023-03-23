const initState = { loading: false, data:null, error: null }

const contractsReducer = (state = initState, action: any) => {
  switch (action.type) {
    case "LOAD_CONTRACTS":
      return {
        ...state,
        loading: true,
      }
    case "LOAD_CONTRACTS_SUCCESS":
      return {
        ...state,
        data: action.payload,
        loading: false,
      }
    case "LOAD_CONTRACTS_ERROR":
      return {
        ...state,
        loading: false,
        error:action.payload
      }
    default:
      return state
  }
}

export default contractsReducer
