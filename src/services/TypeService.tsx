
import { WITH_AUTH_HEADER } from "../constants/GlobalConstants";
import ITypeEmploeeGet from "../models/interfaces/type/ITypeEmploeeGet";
import ITypeEmploeePage from "../models/interfaces/type/ITypeEmploeePage";
import ITypeEmployeePost from "../models/interfaces/type/ITypeEmploeePost";
import { axiosInstance as axios} from '../config/AxiosConfig';
import ITypeEmploeePost from "../models/interfaces/type/ITypeEmploeePost";


const getAll = () => {
  return axios.get<Array<ITypeEmploeeGet>>("http://localhost:8080/api/types", WITH_AUTH_HEADER())
};
const get = (id: any) => {
  return axios.get<Array<ITypeEmploeeGet>>(`http://localhost:8080/api/types/${id}`, WITH_AUTH_HEADER())
};

const create = (data: any) => {
  return axios.post<ITypeEmploeeGet>(`http://localhost:8080/api/types`, data, WITH_AUTH_HEADER())
};

const update = (id: any, data: ITypeEmploeePost) => {
  return axios.put<ITypeEmploeeGet>(`http://localhost:8080/api/types/${id}`, data, WITH_AUTH_HEADER())
};


const remove = (id: any) => {
  return axios.put<any>(`http://localhost:8080/api/types/${id}`, WITH_AUTH_HEADER())
};

const getAllFilter = (data: any) => {
  return axios.post<Array<ITypeEmploeeGet>>(`http://localhost:8080/api/types/filter`,
    data,
    WITH_AUTH_HEADER())

};

const getAllFilterPage = (data: any) => {
  return axios.post<ITypeEmploeePage>("http://localhost:8080/api/types/Page",data, WITH_AUTH_HEADER())
};
const unMarkAsDeleted = (id: any) => {
  return axios.put<any>(`http://localhost:8080/api/types/${id}/unmark`, WITH_AUTH_HEADER())
};

const TypeService = {
  getAll,
  get,
  create,
  update,
  remove,
  getAllFilter,
  getAllFilterPage,
  unMarkAsDeleted
};

export default TypeService;