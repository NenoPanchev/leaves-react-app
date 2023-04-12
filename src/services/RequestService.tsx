
import { WITH_AUTH_HEADER } from "../constants/GlobalConstants";
import ILeaveRequestPage from "../models/interfaces/request/ILeaveRequestPage";
import IRequestDataGet from "../models/interfaces/request/IRequestDataGet";
import IRequestDataPost from "../models/interfaces/request/IRequestDataPost";
import http from "../services/http-common";
import { axiosInstance as axios} from '../config/AxiosConfig';
import IRequestDataApprove from "../models/interfaces/request/IRequestDataAprove";


const getAll = () => {
  console.log("get all without");
  return axios.get<Array<IRequestDataGet>>("http://localhost:8080/api/requests")

};
const getAllByUser = () => {
  console.log("get all request by user");
  return axios.get<Array<IRequestDataGet>>("http://localhost:8080/api/requests/employee")
};
const getAllFilter = (data: any) => {
  console.log("get all filter");
  console.log(data);
  return axios.post<Array<IRequestDataGet>>("http://localhost:8080/api/requests/filter",data)
};

const getAllFilterPage = (data: any) => {
  return axios.post<ILeaveRequestPage>("http://localhost:8080/api/requests/Page",data)
};

const get = (id: any) => {
  return axios.get<Array<IRequestDataGet>>(`http://localhost:8080/api/requests/${id}`)
};

const create = (data: IRequestDataPost) => {
  return axios.post<ILeaveRequestPage>("http://localhost:8080/api/requests",data)

};

const update = (id: any, data: any) => {
  return axios.put<IRequestDataPost>(`http://localhost:8080/api/requests/${id}`,data)
};

const remove = (id: any) => {
  return axios.delete<IRequestDataPost>(`http://localhost:8080/api/requests/${id}`)
};
const approve = (id: any,data:IRequestDataApprove) => {
  return axios.put<any>(`http://localhost:8080/api/requests/${id}/approve`,data)
};
const disapprove = (id: any) => {
  return axios.put<any>(`http://localhost:8080/api/requests/${id}/disapprove`)
};
const unMarkAsDeleted = (id: any) => {
  return axios.put<any>(`http://localhost:8080/api/requests/${id}`)

};

const getPdf = (id: any, data: any) => {
  return axios.post<any>(`http://localhost:8080/users/${id}/pdf`,data,{
    responseType: 'arraybuffer',
  })

};


// const findByTitle = (title: string) => {
//   return http.get<Array<ITutorialData>>(`/tutorials?title=${title}`);
// };

const TutorialService = {
  getAll,
  get,
  create,
  update,
  remove,
  unMarkAsDeleted,
  approve,
  disapprove,
  getAllFilter,
  getAllFilterPage,
  getAllByUser,
  getPdf
};

export default TutorialService;
