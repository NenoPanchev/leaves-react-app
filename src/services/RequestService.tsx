
import { BASE_URL } from "../constants/GlobalConstants";
import ILeaveRequestPage from "../models/interfaces/request/ILeaveRequestPage";
import IRequestDataGet from "../models/interfaces/request/IRequestDataGet";
import IRequestDataPost from "../models/interfaces/request/IRequestDataPost";
import { axiosInstance as axios} from '../config/AxiosConfig';
import IRequestDataApprove from "../models/interfaces/request/IRequestDataAprove";
import IRequestDataPostString from "../models/interfaces/request/IRequestDataPostString";
import { Dayjs } from "dayjs";


const getAll = () => {
  return axios.get<Array<IRequestDataGet>>(BASE_URL + "/api/requests")

};
const getAllByUser = (controller:any) => {
  return axios.get<Array<IRequestDataGet>>(BASE_URL + "/api/requests/employee",{signal:controller.signal})
};
const getAllFilter = (data: any) => {
  return axios.post<Array<IRequestDataGet>>(BASE_URL + "/api/requests/filter",data)
};

const getAllFilterPage = (data: any,controller:any) => {
  return axios.post<ILeaveRequestPage>(BASE_URL + "/api/requests/Page",data,{signal:controller.signal})
};

const get = (id: any) => {
  return axios.get<Array<IRequestDataGet>>(BASE_URL + `/api/requests/${id}`)
};

const create = (data: IRequestDataPost) => {
  return axios.post<ILeaveRequestPage>(BASE_URL + "/api/requests",data)

};
const getAllByUserId = (id: any) => {
  return axios.get<Array<IRequestDataGet>>(BASE_URL + `/api/requests/employee/${id}`)
};
const getAllApprovedByMonth = (date: Dayjs) => {
  return axios.post<Array<IRequestDataGet>>(BASE_URL + `/api/requests/approved`, date)
};
const createRequestString = (data: IRequestDataPostString) => {
  return axios.post<ILeaveRequestPage>(BASE_URL + "/api/requests",data)

};
const update = (id: any, data: any) => {
  return axios.put<IRequestDataPost>(BASE_URL + `/api/requests/${id}`,data)
};

const remove = (id: any) => {
  return axios.delete<IRequestDataPost>(BASE_URL + `/api/requests/${id}`)
};
const approve = (id: any,data:IRequestDataApprove) => {
  return axios.put<any>(BASE_URL + `/api/requests/${id}/approve`,data)
};
const disapprove = (id: any) => {
  return axios.put<any>(BASE_URL + `/api/requests/${id}/disapprove`)
};
const unMarkAsDeleted = (id: any) => {
  return axios.put<any>(BASE_URL + `/api/requests/${id}`)

};

const getPdf = (id: any, data: any) => {
  return axios.post<any>(BASE_URL + `/users/${id}/pdf`,data,{
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
  getAllByUserId,
  getPdf,
  createRequestString,
  getAllApprovedByMonth
};

export default TutorialService;
