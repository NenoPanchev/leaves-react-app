import { useNavigate } from "react-router-dom";
// import { useDelete } from "../services/deleteService";


interface DeleteProps {
    id: number
    path: string
}

function DeletePage(props: DeleteProps) {
const navigate = useNavigate();

// useDelete({...props});

//     navigate('-1');   
    
}

export default DeletePage;