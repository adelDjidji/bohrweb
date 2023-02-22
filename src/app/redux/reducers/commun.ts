const initState = { roles: undefined, companies:undefined,companiesDetails:undefined, groups:undefined, sites:[], types:[], typesTech:[], oldContracts:[] }

const communReducer = (state = initState, action: any) => {
  switch (action.type) {
    case "LOAD_ROLES":
      return {
        ...state,
        roles: action.payload,
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
    default:
      return state
  }
}

export default communReducer
