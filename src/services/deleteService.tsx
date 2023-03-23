import axios from 'axios';

const baseUrl = 'http://localhost:8080'

const withAuthHeader = () => ({
    headers: {
      'Authorization': localStorage.getItem('SavedToken')
    }
  });

interface DeleteProp {
    path: string
}

export const useDelete = (props: DeleteProp) : (id: number) => Promise<void> => {
    


  const deleteItem = async (id: number) => {

    const deleteUrl = baseUrl + props.path + '/' + id;
      const result = await axios.delete(deleteUrl, withAuthHeader())
          .then(response => console.log(response))
          .catch(error => console.log(error))
  }
  return deleteItem;
}