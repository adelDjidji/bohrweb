import ApiService from "../services/ApiService"

const getToken = () => typeof window !== 'undefined' && localStorage.getItem("token");

const isLoggedIn = () => typeof window !== 'undefined' && !!localStorage.getItem("token") //TODO: Verifier if token ok
     
const UserService = {
  isLoggedIn,
  getToken,
};

export default UserService;
