// export const hello = () => ({
//   type: 1,
//   payload: {
//     data: "hello world",
//   },
// });

import ApiService from "../../services/ApiService"
import moment from 'moment'

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


export const fetchDashboard = (show_by_site=true) => {
  return async (dispatch, getState) => {
    // check if data is already present in the store

    const { dashboard } = getState()
    // if (dashboard.data) {
    //   // if data is already present, don't fetch it again
    //   return
    // }

    try {
      dispatch({ type: "LOAD_DASHBOARD" })
      const resp = await ApiService.GetDashboard({show_by_site})
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

export const fetchAnalysis = (start_time='2023-01-01',end_time ='2023-01-01', selectedSites=undefined, show_by_site=false) => {
  return async (dispatch, getState) => {
    // check if data is already present in the store

    const { analyse } = getState()
    // if (analyse.data) {
    //   // if data is already present, don't fetch it again
    //   return
    // }

    // const start = moment(start_time,"DD-MM-YYYY").format("YYYY-MM-DD").toString()
    // const end = moment(end_time,'DD-MM-YYYY').format('YYYY-MM-DD').toString()

    try {
      dispatch({ type: "LOAD_ANALYSE" })
      const resp = await ApiService.GetAnalysis({start_time, end_time , sites_ids:selectedSites, show_by_site})
      if (resp.status == 200) {
        dispatch({ type: "LOAD_ANALYSE_SUCCESS", payload: resp.data.analysis })
      }
    } catch (error) {
      dispatch({ type: "LOAD_ANALYSE_ERROR", payload: error })
    }
  }
}


export const fetchBenchmark = (start_time='2023-01-01',end_time ='2023-01-01', site_id='fa8bfccf-2097-4b3a-a21b-1fbc4db88f20') => {
  return async (dispatch, getState) => {
    // check if data is already present in the store

    const { analyse } = getState()
    // if (analyse.data) {
    //   // if data is already present, don't fetch it again
    //   return
    // }

    // const start = moment(start_time,"DD-MM-YYYY").format("YYYY-MM-DD").toString()
    // const end = moment(end_time,'DD-MM-YYYY').format('YYYY-MM-DD').toString()

    try {
      dispatch({ type: "LOAD_BENCHMARK" })
      const resp = await ApiService.GetBenchmark({start_time, end_time , site_id})
      if (resp.status == 200) {
        console.log(resp.data)
        dispatch({ type: "LOAD_BENCHMARK_SUCCESS", payload: resp.data.benchmark })
      }
    } catch (error) {
      dispatch({ type: "LOAD_BENCHMARK_ERROR", payload: error })
    }
  }
}

export const fetchLive = (start_time='2023-01-01',end_time ='2023-01-01', site_id='fa8bfccf-2097-4b3a-a21b-1fbc4db88f20') => {
  return async (dispatch, getState) => {
    // check if data is already present in the store

    const { analyse } = getState()
    // if (analyse.data) {
    //   // if data is already present, don't fetch it again
    //   return
    // }

    // const start = moment(start_time,"DD-MM-YYYY").format("YYYY-MM-DD").toString()
    // const end = moment(end_time,'DD-MM-YYYY').format('YYYY-MM-DD').toString()

    try {
      dispatch({ type: "LOAD_LIVE" })
      const resp = await ApiService.GetLive({start_time, end_time , site_id})
      if (resp.status == 200) {
        console.log(resp.data)
        dispatch({ type: "LOAD_LIVE_SUCCESS", payload: resp.data.live })
      }
    } catch (error) {
      dispatch({ type: "LOAD_LIVE_ERROR", payload: error })
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

    // const { invoices } = getState()
    // if (invoices.data) {
    //   // if data is already present, don't fetch it again
    //   return
    // }
    console.log("fetchInvoices actions")
    try {
      dispatch({ type: "LOAD_INVOICES" })
      const resp = await ApiService.GetInvoices()
      if (resp.status == 200) {
        console.log('GetInvoices() 200',resp)
        dispatch({ type: "LOAD_INVOICES_SUCCESS", payload: resp.data })
      }
    } catch (error) {
      dispatch({ type: "LOAD_INVOICES_ERROR", payload: error })
    }
  }
}

export const fetchContracts = () => {
  return async (dispatch, getState) => {
    // check if data is already present in the store

    // if (contracts.data) {
    //   // if data is already present, don't fetch it again
    //   return
    // }

    try {
      dispatch({ type: "LOAD_CONTRACTS" })
      const resp = await ApiService.GetContracts()
      if (resp.status == 200) {
        dispatch({ type: "LOAD_CONTRACTS_SUCCESS", payload: resp.data })
      }
    } catch (error) {
      dispatch({ type: "LOAD_CONTRACTS_ERROR", payload: error })
    }
  }
}

export const fetchForecast = (start_time='2023-01-01',end_time ='2023-01-02', selectedSites = undefined) => {
  return async (dispatch, getState) => {
    // check if data is already present in the store

    const { forecast } = getState()
    // if (forecast.data) {
    //   // if data is already present, don't fetch it again
    //   return
    // }

    try {
      dispatch({ type: "LOAD_FORECAST" })
      const resp = await ApiService.GetForecast({start_time, end_time, sites_ids:selectedSites})
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
