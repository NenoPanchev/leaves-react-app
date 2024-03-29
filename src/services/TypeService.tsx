import { axiosInstance as axios } from '../config/AxiosConfig';
import { BASE_URL } from '../constants/GlobalConstants';
import ITypeEmploeeGet from '../models/interfaces/type/ITypeEmploeeGet';
import ITypeEmploeePage from '../models/interfaces/type/ITypeEmploeePage';
import ITypeEmploeePost from '../models/interfaces/type/ITypeEmploeePost';



const getAll = () => {
  return axios.get<Array<ITypeEmploeeGet>>(BASE_URL + "/api/types")
};
const get = (id: any) => {
  return axios.get<Array<ITypeEmploeeGet>>(BASE_URL + `/api/types/${id}`)
};

const create = (data: ITypeEmploeePost) => {
  return axios.post<ITypeEmploeeGet>(BASE_URL + `/api/types`, data)
};

const update = (id: any, data: ITypeEmploeePost) => {
  return axios.put<ITypeEmploeeGet>(BASE_URL + `/api/types/${id}`, data)
};


const remove = (id: any) => {
  return axios.delete<any>(BASE_URL + `/api/types/${id}`)
};

const getAllFilter = (data: any) => {
  return axios.post<Array<ITypeEmploeeGet>>(BASE_URL + `/api/types/filter`, data)

};

const getAllFilterPage = (data: any) => {
  return axios.post<ITypeEmploeePage>(BASE_URL + "/api/types/Page", data)
};
const unMarkAsDeleted = (id: any) => {
  return axios.put<any>(BASE_URL + `/api/types/${id}/unmark`)
};

const getAllTypeNames = () => {
  
  return axios.get<string[]>(BASE_URL + '/api/types/names');
};

const TypeService = {
  getAll,
  get,
  create,
  update,
  remove,
  getAllFilter,
  getAllFilterPage,
  unMarkAsDeleted,
  getAllTypeNames,
};

export default TypeService;