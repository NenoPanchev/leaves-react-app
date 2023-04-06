import ITypeEmploeeGet from "../models/interfaces/type/ITypeEmploeeGet";
import ITypeEmploeePage from "../models/interfaces/type/ITypeEmploeePage";
import ITypeEmployeePost from "../models/interfaces/type/ITypeEmploeePost";
import http from "../services/http-common";


const getAll = () => {
    return http.get<Array<ITypeEmploeeGet>>("/types");
  };
  const get = (id: any) => {
    return http.get<ITypeEmploeeGet>(`/types/${id}`);
  };
  
  const create = (data: ITypeEmployeePost) => {
    return http.post<ITypeEmploeeGet>("/types", data);
  };
  
  const update = (id: any, data: ITypeEmployeePost) => {
    return http.put<ITypeEmploeeGet>(`/types/${id}`, data);
  };
  
  const remove = (id: any) => {
    return http.delete<any>(`/types/${id}`);
  };

  const getAllFilter = (data: any) => {
    return http.post<Array<ITypeEmploeeGet>>("/types/filter",data);
  };

  const getAllFilterPage = (data: any) => {
    return http.post<ITypeEmploeePage>("/types/Page",data);
  };
  const unMarkAsDeleted = (id: any) => {
    return http.put<any>(`/types/${id}/unmark`);
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