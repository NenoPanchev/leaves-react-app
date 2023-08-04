import { ComponentType, FC, useEffect } from "react"
import { useNavigate } from "react-router-dom";


const isAuth = (
    WrappedComponent: ComponentType,
): FC => (props) => {
    const navigate = useNavigate();
    const isAuthenticated = localStorage.getItem('Authenticated') == 'true';

    if (isAuthenticated) {
        return <WrappedComponent {...props} />
    } else {
        useEffect( () => {
                navigate('/login')
        }, [])
        return null;
    }
}

export default isAuth;