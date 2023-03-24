const initState = { loading: false, data:null, error: null }

const benchmarkReducer = (state = initState, action: any) => {
  switch (action.type) {
    case "LOAD_BENCHMARK":
      return {
        ...state,
        loading: true,
      }
    case "LOAD_BENCHMARK_SUCCESS":
      return {
        ...state,
        data: action.payload,
        loading: false,
      }
    case "LOAD_BENCHMARK_ERROR":
      return {
        ...state,
        loading: false,
        error:action.payload
      }
    default:
      return state
  }
}

export default benchmarkReducer