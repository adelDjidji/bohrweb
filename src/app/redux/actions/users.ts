
import ApiService from "../../services/ApiService"

export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: "LOAD_USERS" })
      const resp = await ApiService.GetUsers()
      if (resp.status == 200) {
        dispatch({ type: "LOAD_USERS_SUCCESS", payload: resp.data })
      }
    } catch (error) {
      dispatch({ type: "LOAD_USERS_ERROR", payload: error })
    }
  }
}

export const loadUsers = () => {
  return async (dispatch, getState) => {
    // check if data is already present in the store

    const { users } = getState()
    // if (users.list.length) {
    //   // if data is already present, don't fetch it again
    //   return
    // }

    try {
      dispatch({ type: "LOAD_USERS" })
      const resp = await ApiService.GetUsers()
      if (resp.status == 200) {
        dispatch({ type: "LOAD_USERS_SUCCESS", payload: resp.data })
      }
    } catch (error) {
      dispatch({ type: "LOAD_USERS_ERROR", payload: error })
    }
  }
}
