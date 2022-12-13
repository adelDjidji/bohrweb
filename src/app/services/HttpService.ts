import axios from "axios";
import UserService from "./UserService";

const HttpMethods = {
  GET: "GET",
  POST: "POST",
  DELETE: "DELETE",
};

const _axios = axios.create();

const configure = () => {
  // eslint-disable-next-line consistent-return
  _axios.interceptors.request.use((config) => {
    if (UserService.isLoggedIn()) {
      config.headers.Authorization = `Bearer ${UserService.getToken()}`;
    }
    return Promise.resolve(config);
  });
};

const getAxiosClient = () => _axios;

const post = (url: string, body: any) => _axios.post(url, body);
const put = (url: string, body: any) => _axios.put(url, body);
const get = (url: string) => _axios.get(url);
const remove = (url: string) => _axios.delete(url);

const HttpService = {
  HttpMethods,
  configure,
  getAxiosClient,
  post,
  get,
  remove,
  put,
};

export default HttpService;
