import ILeaveRequestPage from "../models/interfaces/request/ILeaveRequestPage";
import IRequestDataGet from "../models/interfaces/request/IRequestDataGet";
import IRequestDataPost from "../models/interfaces/request/IRequestDataPost";
import http from "../services/http-common";





const getAll = () => {
  console.log("get all without");
  return http.get<Array<IRequestDataGet>>("/requests");
};
const getAllByUser = () => {
  console.log("get all request by user");
  return http.get<Array<IRequestDataGet>>("/requests/employee");
};
const getAllFilter = (data: any) => {
  console.log("get all filter");
  console.log(data);
  return http.post<Array<IRequestDataGet>>("/requests/filter",data);
};

const getAllFilterPage = (data: any) => {
  return http.post<ILeaveRequestPage>("/requests/Page",data);
};

const get = (id: any) => {
  return http.get<IRequestDataGet>(`/requests/${id}`);
};

const create = (data: IRequestDataPost) => {
  return http.post<IRequestDataPost>("/requests", data);
};

const update = (id: any, data: IRequestDataPost) => {
  return http.put<any>(`/requests/${id}`, data);
};

const remove = (id: any) => {
  return http.delete<any>(`/requests/${id}`);
};
const approve = (id: any) => {
  return http.put<any>(`/requests/${id}/approve`);
};
const disapprove = (id: any) => {
  return http.put<any>(`/requests/${id}/disapprove`);
};
const unMarkAsDeleted = (id: any) => {
  return http.put<any>(`/requests/${id}`);
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
  getAllByUser
};

export default TutorialService;
