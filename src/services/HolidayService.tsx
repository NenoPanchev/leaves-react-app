import { Dayjs } from 'dayjs';
import { axiosInstance as axios } from '../config/AxiosConfig';
import ITypeEmploeeGet from '../models/interfaces/type/ITypeEmploeeGet';
import ITypeEmploeePage from '../models/interfaces/type/ITypeEmploeePage';
import ITypeEmploeePost from '../models/interfaces/type/ITypeEmploeePost';
import { BASE_URL } from '../constants/GlobalConstants';



const getAll = (controller:any) => {
  return axios.get<Array<string>>(BASE_URL + "/api/dates",{signal:controller.signal})
};

const HolidayService = {
  getAll
};

export default HolidayService;