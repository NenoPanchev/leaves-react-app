import { axiosInstance as axios} from '../config/AxiosConfig';
import { BASE_URL } from '../constants/GlobalConstants';


interface DeleteProp {
    path: string
}

export const useDelete = (props: DeleteProp) : (id: number) => Promise<void> => {
    
  const deleteItem = async (id: number) => {

    const deleteUrl = BASE_URL + props.path + '/' + id;
      const result = await axios.delete(deleteUrl)
          .then(response => console.log(response))
          .catch(error => console.log(error))
  }
  return deleteItem;
}