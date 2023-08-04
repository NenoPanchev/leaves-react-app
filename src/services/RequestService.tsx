
import { BASE_REQUEST_URL, BASE_URL } from "../constants/GlobalConstants";
import ILeaveRequestPage from "../models/interfaces/request/ILeaveRequestPage";
import IRequestDataGet from "../models/interfaces/request/IRequestDataGet";
import IRequestDataPost from "../models/interfaces/request/IRequestDataPost";
import { axiosInstance as axios} from '../config/AxiosConfig';
import IRequestDataApprove from "../models/interfaces/request/IRequestDataAprove";
import IRequestDataPostString from "../models/interfaces/request/IRequestDataPostString";
import { Dayjs } from "dayjs";


const getAll = () => {
  return axios.get<Array<IRequestDataGet>>(BASE_REQUEST_URL)

};
const getAllByUser = (controller:any) => {
  return axios.get<Array<IRequestDataGet>>(BASE_REQUEST_URL + "/employee",{signal:controller.signal})
};
const getAllFilter = (data: any) => {
  return axios.post<Array<IRequestDataGet>>(BASE_REQUEST_URL + "/filter",data)
};

const getAllFilterPage = (data: any,controller:any) => {
  return axios.post<ILeaveRequestPage>(BASE_REQUEST_URL + "/Page",data,{signal:controller.signal})
};

const get = (id: any) => {
  return axios.get<Array<IRequestDataGet>>(BASE_REQUEST_URL + `/${id}`)
};

const create = (data: IRequestDataPost) => {
  return axios.post<ILeaveRequestPage>(BASE_REQUEST_URL, data)

};
const getAllByUserId = (id: any) => {
  return axios.get<Array<IRequestDataGet>>(BASE_REQUEST_URL + `/employee/${id}`)
};
const getAllApprovedByMonth = (date: Dayjs) => {
  return axios.post<Array<IRequestDataGet>>(BASE_REQUEST_URL + '/approved', date)
};
const createRequestString = (data: IRequestDataPostString) => {
  return axios.post<ILeaveRequestPage>(BASE_REQUEST_URL, data)

};
const update = (id: any, data: any) => {
  return axios.put<IRequestDataPost>(BASE_REQUEST_URL + `/${id}`,data)
};

const remove = (id: any) => {
  return axios.delete<IRequestDataPost>(BASE_REQUEST_URL + `/${id}`)
};
const approve = (id: any,data:IRequestDataApprove) => {
  return axios.put<any>(BASE_REQUEST_URL + `/${id}/approve`,data)
};
const disapprove = (id: any) => {
  return axios.put<any>(BASE_REQUEST_URL + `/${id}/disapprove`)
};
const unMarkAsDeleted = (id: any) => {
  return axios.put<any>(BASE_REQUEST_URL + `/${id}`)
};

const getPdf = (id: any, data: any) => {
  return axios.post<any>(BASE_URL + `/users/${id}/pdf`,data,{
    responseType: 'arraybuffer',
  })
};

const getAllInTableView = (year: number) => {
  return axios.post(BASE_REQUEST_URL + '/days-used-table', year)
};

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
  getAllApprovedByMonth,
  getAllInTableView
};

export default TutorialService;
