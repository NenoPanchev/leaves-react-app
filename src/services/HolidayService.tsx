import { Dayjs } from 'dayjs';
import { axiosInstance as axios } from '../config/AxiosConfig';
import ITypeEmploeeGet from '../models/interfaces/type/ITypeEmploeeGet';
import ITypeEmploeePage from '../models/interfaces/type/ITypeEmploeePage';
import ITypeEmploeePost from '../models/interfaces/type/ITypeEmploeePost';



const getAll = () => {
  return axios.get<Array<string>>("http://localhost:8080/api/dates")
};

const HolidayService = {
  getAll
};

export default HolidayService;