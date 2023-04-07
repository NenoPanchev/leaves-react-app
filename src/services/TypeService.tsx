import { axiosInstance as axios} from '../config/AxiosConfig';
import ITypeEmploeeGet from '../models/interfaces/type/ITypeEmploeeGet';
import ITypeEmploeePage from '../models/interfaces/type/ITypeEmploeePage';
import ITypeEmploeePost from '../models/interfaces/type/ITypeEmploeePost';



const getAll = () => {
  return axios.get<Array<ITypeEmploeeGet>>("http://localhost:8080/api/types")
};
const get = (id: any) => {
  return axios.get<Array<ITypeEmploeeGet>>(`http://localhost:8080/api/types/${id}`)
};

const create = (data: ITypeEmploeePost) => {
  return axios.post<ITypeEmploeeGet>(`http://localhost:8080/api/types`, data)
};

const update = (id: any, data: ITypeEmploeePost) => {
  return axios.put<ITypeEmploeeGet>(`http://localhost:8080/api/types/${id}`, data)
};


const remove = (id: any) => {
  return axios.put<any>(`http://localhost:8080/api/types/${id}`)
};

const getAllFilter = (data: any) => {
  return axios.post<Array<ITypeEmploeeGet>>(`http://localhost:8080/api/types/filter`,data)

};

const getAllFilterPage = (data: any) => {
  return axios.post<ITypeEmploeePage>("http://localhost:8080/api/types/Page",data)
};
const unMarkAsDeleted = (id: any) => {
  return axios.put<any>(`http://localhost:8080/api/types/${id}/unmark`)
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