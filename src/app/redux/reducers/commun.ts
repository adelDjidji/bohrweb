const initState = { roles: undefined, products: undefined, companies: undefined, companiesDetails: undefined, groups: undefined, sites: [], types: [], typesTech: [], oldContracts: [], OAContracts: [] }

const communReducer = (state = initState, action: any) => {
  switch (action.type) {
    case "LOAD_ROLES":
      return {
        ...state,
        roles: action.payload,
      }
    case "LOAD_PRODUCTS":
      return {
        ...state,
        products: action.payload,
      }
    case "LOAD_COMPANIES":
      return {
        ...state,
        companies: action.payload,
      }
    case "LOAD_COMPANIES_DETAILS":
      return {
        ...state,
        companiesDetails: action.payload,
      }
    case "LOAD_SITES":
      return {
        ...state,
        sites: action.payload,
      }
    case "LOAD_GROUPS":
      return {
        ...state,
        groups: action.payload,
      }
    case "LOAD_TYPES":
      return {
        ...state,
        types: action.payload,
      }
    case "LOAD_TYPES_TECH":
      return {
        ...state,
        typesTech: action.payload,
      }
    case "LOAD_OLD_CONTRACTS":
      return {
        ...state,
        oldContracts: action.payload,
      }
    case "LOAD_OA_CONTRACTS":
      return {
        ...state,
        OAContracts: action.payload,
      }
    default:
      return state
  }
}

export default communReducer
