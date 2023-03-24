import { IRegister } from "../interfaces"
import HttpService from "./HttpService"

const url = process.env.GATSBY_API_URL

// Validate token
const isLoggedIn = () =>
  HttpService.get(`${url}application/isLoggedIn`).then(res => {
    if (res.data.data == "valid token") {
      return true
    } else {
      return false
    }
  })

// Log in
const Login = (body: { username: string; password: string }) =>
  HttpService.post(`${url}users/login`, body)

const SendSmsAuth = (token: string, phone: string) =>
  HttpService.get(`${url}users/send_sms_auth`, { token, phone })

const SendSmsVerification = () =>
  HttpService.secureGet(`${url}assets/send_sms_verification`)

const ValidateToken = (token: string) =>
  HttpService.get(`${url}users/validate_token`, { token })

const CreatePassword = (body: {
  password: string
  confirmed_password: string
  token: string
}) => HttpService.post(`${url}users/create_password`, body)

const ForgotPassword = (body: { email: string }) =>
  HttpService.post(`${url}users/reset_password`, body)

const Subscribe = (body: any) => HttpService.post(`${url}users/subscribe`, body)

const Register = (body: IRegister) => HttpService.post(`${url}register`, body)

const SetPassword = (body: {
  password?: string
  token: string
  resetCount: boolean
}) => HttpService.post(`${url}password`, body)

const SendMail = (body: {
  mail: string
  name: string
  company: string
  message: string
  phone: string
}) => HttpService.post(`${url}mails/contact_message`, body)

const GetUsers = () => HttpService.secureGet(`${url}assets/get_users`)

const GetCompanies = () => HttpService.secureGet(`${url}assets/get_companies`)

const GetCompaniesDetails = () => HttpService.secureGet(`${url}assets/get_companies_details`)

const GetBankDetails = (company_id:string) => HttpService.securePost(`${url}assets/get_bank_details`, {company_id})

const GetRoles = () => HttpService.secureGet(`${url}assets/get_roles`)

const GetProducts = () => HttpService.secureGet(`${url}assets/get_product`)

const GetSites = (company?: string) =>
  HttpService.secureGet(`${url}assets/get_sites`, { company })

const GetTechnologies = (company?: string) =>
  HttpService.secureGet(`${url}assets/get_technologies`, { company })

const GetSitesDetails = () =>
  HttpService.secureGet(`${url}assets/get_sites_detail`)

const GetOldContracts = () =>
  HttpService.secureGet(`${url}assets/get_oa_contracts`)

const GetTypes = (company?: string) =>
  HttpService.secureGet(`${url}outages/get_outage_types`, { company })

const GetGroups = () => HttpService.secureGet(`${url}assets/get_groups`)



type IDateRange = {
  start_time: string
  end_time: string
}
type IAnalysis = {
  start_time: string
  end_time: string
  sites_ids?:string[]
  show_by_site:boolean
}

type IBenchmark = {
  start_time: string
  end_time : string
  site_id : string
}

const GetMarche = (params: IDateRange) =>
  HttpService.secureGet(`${url}accounts/get_market`, params)

const GetAnalysis = (params: IAnalysis) =>
  HttpService.secureGet(`${url}accounts/get_analysis`, params)

const GetBenchmark = (params: IBenchmark) =>
  HttpService.secureGet(`${url}accounts/get_benchmark`, params)

const GetLive = (params: IBenchmark) =>
  HttpService.secureGet(`${url}accounts/get_live`, params)

const GetPortfolio = (params: IDateRange) =>
  HttpService.secureGet(`${url}accounts/get_portfolio`, params)

const GetOutages = (params: IDateRange) =>
  HttpService.secureGet(`${url}outages/get_outages`, params)

const GetInvoices = () => HttpService.secureGet(`${url}accounts/get_invoices`)
const GetContracts = () => HttpService.secureGet(`${url}accounts/get_contracts`)


const GetOAContracts = () => HttpService.secureGet(`${url}assets/get_oa_contracts`)


const GetInvoice = (id: string) =>
  HttpService.secureGet(`${url}accounts/get_invoice`, { id })

const GetContract = (id: string) =>
  HttpService.secureGet(`${url}accounts/get_contract`, { id })

const DeleteUser = (body: { mail: string }) =>
  HttpService.securePost(`${url}invitation/delete_user`, body)

const DeleteProduct = (body: { public_id: string }) =>
  HttpService.securePost(`${url}assets/delete_product`, body)

const ModifyUser = (body: any) =>
  HttpService.securePost(`${url}assets/modify_user`, body)

const InviteUser = (body: any) =>
  HttpService.securePost(`${url}invitation/invite_user`, body)

const CreateCompany = (body: any) =>
  HttpService.securePost(`${url}assets/create_company`, body)

const CreateProduct= (body: any) =>
  HttpService.securePost(`${url}assets/create_product`, body)

const CreateGroup = (body: any) =>
  HttpService.securePost(`${url}assets/create_group`, body)

const AddSite = (body: any) =>
  HttpService.securePost(`${url}assets/site_onboard`, body)

const Withdraw = (body: any) =>
  HttpService.securePost(`${url}accounts/withdraw`, body)

const ModifySite = (body: any) =>
  HttpService.securePost(`${url}assets/modify_site`, body)

const ModifyCompany = (body: any) =>
  HttpService.securePost(`${url}assets/modify_company`, body)

const GetForecast = (params: IForecast) =>
  HttpService.secureGet(`${url}accounts/get_forecast`, params)

const UploadFile = (body: any) =>
HttpService.securePostFile(`${url}accounts/upload`, body)
 
const UploadContract = (body: any) =>
HttpService.securePostFile(`${url}accounts/upload_contract`, body)

const UploadInvoice = (body: any) =>
HttpService.securePostFile(`${url}accounts/upload_invoice`, body)


type IForecast = {
    start_time: string
    end_time: string
    sites_ids?:string[]
  }




  type Isiren = {
    siren : string;
  }

const Pappers = (params: Isiren) => 
  HttpService.secureGet(`${url}assets/get_companies_by_siren`, params)

type ISwitch = {
  show_by_site: boolean
  }

const GetDashboard = (params: ISwitch) => 
  HttpService.secureGet(`${url}accounts/get_dashboard`,params)

type IArret = {
  public_id?: string
  start_time: string
  end_time: string
  remaining_power: number
  site_public_id: string
  outage_type: string
  comment: string
}
const SignalerArret = (body: IArret) =>
  HttpService.securePost(`${url}outages/create_outage`, body)

// const SendMail = (body: { mail:string,
//                           name:string,
//                           company:string,
//                           message:string,
//                           phone:string }) =>
//   HttpService.post(`${url}api/contact/contact_message`, body);

const LoginAsUser = (body: { email: string }) =>
  HttpService.securePost(`${url}management/login_as_user`, body)

const LogoutAsUser = () =>
  HttpService.secureGet(`${url}management/logout_as_user`)

const ApiService = {
  UploadFile,
  UploadInvoice,
  UploadContract,
  GetBenchmark,
  GetLive,
  isLoggedIn,
  Login,
  Register,
  SetPassword,
  ForgotPassword,
  SendMail,
  ValidateToken,
  SendSmsAuth,
  Subscribe,
  CreatePassword,
  GetUsers,
  DeleteUser,
  DeleteProduct,
  ModifyUser,
  GetCompanies,
  GetRoles,
  GetProducts,
  GetSites,
  InviteUser,
  CreateCompany,
  CreateGroup,
  CreateProduct,
  LoginAsUser,
  GetGroups,
  GetDashboard,
  GetMarche,
  GetAnalysis,
  GetPortfolio,
  GetOutages,
  GetTypes,
  LogoutAsUser,
  GetInvoices,
  GetContracts,
  GetForecast,
  SendSmsVerification,
  Withdraw,
  AddSite,
  SignalerArret,
  ModifySite,
  ModifyCompany,
  GetSitesDetails,
  GetTechnologies,
  GetOldContracts,
  GetInvoice,
  GetContract,
  GetCompaniesDetails,
  GetBankDetails,
  Pappers,
  GetOAContracts,
}

export default ApiService
