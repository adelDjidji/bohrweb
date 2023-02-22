// export const hello = () => ({
//   type: 1,
//   payload: {
//     data: "hello world",
//   },
// });

import ApiService from "../../services/ApiService"

export function closeMessage() {
  return {
    type: "CLOSE",
  }
}
export function errMessage(message: string) {
  return {
    type: "MESSAGE",
    payload: {
      message,
      severity: "error",
    },
  }
}

export function successMessage(message: string) {
  return {
    type: "MESSAGE",
    payload: {
      message,
      severity: "success",
    },
  }
}


export const fetchDashboard = () => {
  return async (dispatch, getState) => {
    // check if data is already present in the store

    const { dashboard } = getState()
    // if (dashboard.data) {
    //   // if data is already present, don't fetch it again
    //   return
    // }

    try {
      dispatch({ type: "LOAD_DASHBOARD" })
      const resp = await ApiService.GetDashboard()
      if (resp.status == 200) {
        dispatch({ type: "LOAD_DASHBOARD_SUCCESS", payload: resp.data.dashboard })
      }
    } catch (error) {
      dispatch({ type: "LOAD_DASHBOARD_ERROR", payload: error })
    }
  }
}

export const fetchMarche = (start_time='2023-01-01',end_time ='2023-01-02') => {
  return async (dispatch, getState) => {
    // check if data is already present in the store

    const { marche } = getState()
    // if (marche.data) {
    //   // if data is already present, don't fetch it again
    //   return
    // }

    try {
      dispatch({ type: "LOAD_MARCHE" })
      const resp = await ApiService.GetMarche({start_time, end_time})
      if (resp.status == 200) {
        dispatch({ type: "LOAD_MARCHE_SUCCESS", payload: resp.data })
      }
    } catch (error) {
      dispatch({ type: "LOAD_MARCHE_ERROR", payload: error })
    }
  }
}

export const fetchAnalysis = (start_time='2023-01-01',end_time ='2023-01-02') => {
  return async (dispatch, getState) => {
    // check if data is already present in the store

    const { analyse } = getState()
    // if (analyse.data) {
    //   // if data is already present, don't fetch it again
    //   return
    // }

    try {
      dispatch({ type: "LOAD_ANALYSE" })
      const resp = await ApiService.GetAnalysis({start_time, end_time})
      if (resp.status == 200) {
        dispatch({ type: "LOAD_ANALYSE_SUCCESS", payload: resp.data.analysis })
      }
    } catch (error) {
      dispatch({ type: "LOAD_ANALYSE_ERROR", payload: error })
    }
  }
}

export const fetchPortfolio = (start_time='2023-01-01',end_time ='2023-01-02') => {
  return async (dispatch, getState) => {
    // check if data is already present in the store

    const { portfolio } = getState()
    // if (portfolio.data) {
    //   // if data is already present, don't fetch it again
    //   return
    // }

    try {
      dispatch({ type: "LOAD_PORTFOLIO" })
      const resp = await ApiService.GetPortfolio({start_time, end_time})
      if (resp.status == 200) {
        dispatch({ type: "LOAD_PORTFOLIO_SUCCESS", payload: resp.data.portfolio })
      }
    } catch (error) {
      dispatch({ type: "LOAD_PORTFOLIO_ERROR", payload: error })
    }
  }
}

export const fetchOutages = (start_time='2023-01-01',end_time ='2023-01-02') => {
  return async (dispatch, getState) => {
    // check if data is already present in the store

    const { outage } = getState()
    // if (outage.data) {
    //   // if data is already present, don't fetch it again
    //   return
    // }

    try {
      dispatch({ type: "LOAD_OUTAGE" })
      const resp = await ApiService.GetOutages({start_time, end_time})
      if (resp.status == 200) {
        dispatch({ type: "LOAD_OUTAGE_SUCCESS", payload: resp.data.outages.outages })
      }
    } catch (error) {
      dispatch({ type: "LOAD_OUTAGE_ERROR", payload: error })
    }
  }
}

export const fetchInvoices = () => {
  return async (dispatch, getState) => {
    // check if data is already present in the store

    const { invoices } = getState()
    // if (invoices.data) {
    //   // if data is already present, don't fetch it again
    //   return
    // }

    try {
      dispatch({ type: "LOAD_INVOICES" })
      const resp = await ApiService.GetInvoices()
      if (resp.status == 200) {
        dispatch({ type: "LOAD_INVOICES_SUCCESS", payload: resp.data.invoices })
      }
    } catch (error) {
      dispatch({ type: "LOAD_INVOICES_ERROR", payload: error })
    }
  }
}

export const fetchContracts = () => {
  return async (dispatch, getState) => {
    // check if data is already present in the store

    const { contracts } = getState()
    // if (contracts.data) {
    //   // if data is already present, don't fetch it again
    //   return
    // }

    try {
      dispatch({ type: "LOAD_CONTRACTS" })
      const resp = await ApiService.GetContracts()
      if (resp.status == 200) {
        dispatch({ type: "LOAD_CONTRACTS_SUCCESS", payload: resp.data.contracts })
      }
    } catch (error) {
      dispatch({ type: "LOAD_CONTRACTS_ERROR", payload: error })
    }
  }
}

export const fetchForecast = (start_time='2023-01-01',end_time ='2023-01-02') => {
  return async (dispatch, getState) => {
    // check if data is already present in the store

    const { forecast } = getState()
    // if (forecast.data) {
    //   // if data is already present, don't fetch it again
    //   return
    // }

    try {
      dispatch({ type: "LOAD_FORECAST" })
      const resp = await ApiService.GetForecast({start_time, end_time})
      if (resp.status == 200) {
        dispatch({ type: "LOAD_FORECAST_SUCCESS", payload: resp.data })
      }
    } catch (error) {
      dispatch({ type: "LOAD_FORECAST_ERROR", payload: error })
    }
  }
}

export const fetchSitesDetail = () => {
  return async (dispatch, getState) => {
    // check if data is already present in the store

    const { sites } = getState()
    // if (sites.data) {
    //   // if data is already present, don't fetch it again
    //   return
    // }

    try {
      dispatch({ type: "LOAD_SITES_DETAIL" })
      const resp = await ApiService.GetSitesDetails()
      if (resp.status == 200) {
        dispatch({ type: "LOAD_SITES_DETAIL_SUCCESS", payload: resp.data })
      }
    } catch (error) {
      dispatch({ type: "LOAD_SITES_DETAIL_ERROR", payload: error })
    }
  }
}
