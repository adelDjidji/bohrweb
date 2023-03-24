import ApiService from "../../services/ApiService";

export const fetchRoles = () => {
    return async (dispatch, getState) => {
      // check if data is already present in the store

      // const {commun}  = getState();
      // if (commun.roles?.length) {
      //   // if data is already present, don't fetch it again
      //   return;
      // }
      
      try {
          const resp = await ApiService.GetRoles()
          if(resp.status==200){
            dispatch({type:'LOAD_ROLES', payload:resp.data.roles.map((role:string)=>({key:role, value:role}))})
          }
      } catch (error) {
        
      }
    }
  };
  

export const fetchProducts = () => {
    return async (dispatch, getState) => {
      // check if data is already present in the store

      // const {commun}  = getState();
      // if (commun.roles?.length) {
      //   // if data is already present, don't fetch it again
      //   return;
      // }
      
      try {
          const resp = await ApiService.GetProducts()
          if(resp.status==200){
            console.log('Get_products',resp.data)
            dispatch({type:'LOAD_PRODUCTS', payload:resp.data})
          }
      } catch (error) {
        
      }
    }
  };
  

export const fetchCompanies = () => {
    return async (dispatch, getState) => {
      // check if data is already present in the store

      // const {commun}  = getState();
      // if (commun.companies?.length) {
      //   // if data is already present, don't fetch it again
      //   return;
      // }

      
      try {
          const resp = await ApiService.GetCompanies()
          if(resp.status==200){
            console.log('fetchCompanies',resp.data)
            dispatch({type:'LOAD_COMPANIES', payload:resp.data})
          }
      } catch (error) {
        
      }
    }
  };



export const fetchCompaniesDetails = () => {
    return async (dispatch, getState) => {
      // check if data is already present in the store

      // const {commun}  = getState();
      // if (commun.companies?.length) {
      //   // if data is already present, don't fetch it again
      //   return;
      // }
      
      try {
          const resp = await ApiService.GetCompaniesDetails()
         
          if(resp.status==200){
            console.log('fetchCompaniesDetails',resp.data)
            dispatch({type:'LOAD_COMPANIES_DETAILS', payload:resp.data})
          }
      } catch (error) {
        
      }
    }
  };
export const fetchSites = () => {
    return async (dispatch, getState) => {
      // check if data is already present in the store

      // const {commun}  = getState();
      // if (commun.sites?.length) {
      //   // if data is already present, don't fetch it again
      //   return;
      // }
      
      try {
          const resp = await ApiService.GetSites()
          if(resp.status==200){
            dispatch({type:'LOAD_SITES', payload:resp.data})
          }
      } catch (error) {
        
      }
    }
  };

export const loadGroups = () => {
    return async (dispatch) => {

      try {
          const resp = await ApiService.GetGroups()
          if(resp.status==200){
            dispatch({type:'LOAD_GROUPS', payload:resp.data})
          }
      } catch (error) {
        
      }
    }
  };
export const fetchGroups = () => {
    return async (dispatch, getState) => {
      // check if data is already present in the store

      // const {commun}  = getState();
      // if (commun.groups?.length) {
      //   // if data is already present, don't fetch it again
      //   return;
      // }
      
      try {
          const resp = await ApiService.GetGroups()
          if(resp.status==200){
            dispatch({type:'LOAD_GROUPS', payload:resp.data})
          }
      } catch (error) {
        
      }
    }
  };
export const fetchTypes = () => {
    return async (dispatch, getState) => {
      // check if data is already present in the store

      // const {commun}  = getState();
      // if (commun.types?.length) {
      //   // if data is already present, don't fetch it again
      //   return;
      // }
      
      try {
          const resp = await ApiService.GetTypes()
          if(resp.status==200){
            dispatch({type:'LOAD_TYPES', payload:resp.data.outages})
          }
      } catch (error) {
        
      }
    }
  };


export const fetchTypesTech = () => {
    return async (dispatch, getState) => {
      // check if data is already present in the store

      // const {commun}  = getState();
      // if (commun.typesTech?.length) {
      //   // if data is already present, don't fetch it again
      //   return;
      // }
      
      try {
          const resp = await ApiService.GetTechnologies()
          if(resp.status==200){
            dispatch({type:'LOAD_TYPES_TECH', payload:resp.data.technologies})
          }
      } catch (error) {
        
      }
    }
  };

export const fetchOldContracts = () => {
    return async (dispatch, getState) => {
      // check if data is already present in the store

      // const {commun}  = getState();
      // if (commun.oldContracts?.length) {
      //   // if data is already present, don't fetch it again
      //   return;
      // }
      try {
          const resp = await ApiService.GetOldContracts()
          if(resp.status==200){
            dispatch({type:'LOAD_OLD_CONTRACTS', payload:resp.data.contracts})
          }
      } catch (error) {
        
      }
    }
  };

  export const fetchOAContracts = () => {
    return async (dispatch, getState) => {
      // check if data is already present in the store

      // const {commun}  = getState();
      // if (commun.oldContracts?.length) {
      //   // if data is already present, don't fetch it again
      //   return;
      // }
      try {
          const resp = await ApiService.GetOAContracts()
          if(resp.status==200){
            console.log('GetOAContracts',resp.data)
            dispatch({type:'LOAD_OA_CONTRACTS', payload:resp.data.OAcontractTypes})
          }
      } catch (error) {
        
      }
    }
  };

  
export const FetchUploadFile = (file) => {
  console.log('FetchUploadFile 1 ')
  return async (dispatch, getState) => {
    // check if data is already present in the store

    // const {commun}  = getState();
    // if (commun.oldContracts?.length) {
    //   // if data is already present, don't fetch it again
    //   return;
    // }
    console.log('FetchUploadFile 2')
    try {
        const resp = await ApiService.UploadFile(file)
        if(resp.status==200){
          console.log('FetchUploadFile',resp.data)
        }
    } catch (error) {
      
    }
  }
};

