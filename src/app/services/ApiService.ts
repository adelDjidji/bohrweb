import { IRegister } from "../interfaces";
import HttpService from "./HttpService";

const url = process.env.GATSBY_API_URL;

// Validate token
const isLoggedIn = () => HttpService.get(`${url}application/isLoggedIn`)
  .then(res => {
    if (res.data.data == "valid token"){
      return true
    }
    else{
      return false
    }
  });

// Log in 
const Login = (body: { username: string; password: string }) =>
  HttpService.post(`${url}users/login`, body);

const ForgotPassword = (body: { email: string }) =>
  HttpService.post(`${url}reset`, body);

const Register = (body: IRegister) => HttpService.post(`${url}register`, body);

const SetPassword = (body: {
  password?: string;
  token: string;
  resetCount: boolean;
}) => HttpService.post(`${url}password`, body);

const SendMail = (body: { mail:string, 
                          name:string,
                          company:string, 
                          message:string, 
                          phone:string }) =>
  HttpService.post(`${url}mails/contact_message`, body);

const ApiService = {
  isLoggedIn,
  Login,
  Register,
  SetPassword,
  ForgotPassword,
  SendMail
};

export default ApiService;
