import { axiosInstance as axios } from '../config/AxiosConfig';
import { BASE_URL } from '../constants/GlobalConstants';



const getAll = (controller:any) => {
  return axios.get<Array<string>>(BASE_URL + "/api/dates",{signal:controller.signal})
};

const HolidayService = {
  getAll
};

export default HolidayService;