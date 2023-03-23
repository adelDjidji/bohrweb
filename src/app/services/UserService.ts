import ApiService from "../services/ApiService"

const getToken = () => typeof window !== 'undefined' && localStorage.getItem("token");

const isLoggedIn = () => typeof window !== 'undefined' && !!localStorage.getItem("token") //TODO: Verifier if token ok

const isSuperadmin = () => isLoggedIn() && !!localStorage.getItem("user") && JSON.parse(localStorage.getItem("user")||'null')?.role == 'superadmin'
     
const UserService = {
  isLoggedIn,
  getToken,
  isSuperadmin
};

export default UserService;
