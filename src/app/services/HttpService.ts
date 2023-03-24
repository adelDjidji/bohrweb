import axios from "axios";
import { useEffect } from "react";
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
const get = (url: string, params?:any) => _axios.get(url, {params});
const secureGet = (url: string, params?:any) => _axios.get(url, { headers: { Authorization: `Bearer ${UserService.getToken()}` }, params });
const securePost = (url: string, body:any) => _axios.post(url, body, { headers: { Authorization: `Bearer ${UserService.getToken()}` } });
const securePostFile = (url: string, body:any) => _axios.post(url, body, { headers: { Authorization: `Bearer ${UserService.getToken()}`, contentType: 'multipart/form-data' } });
const remove = (url: string) => _axios.delete(url);

const HttpService = {
  HttpMethods,
  configure,
  getAxiosClient,
  post,
  get,
  remove,
  put,
  secureGet,
  securePost,
  securePostFile
};

export default HttpService;
