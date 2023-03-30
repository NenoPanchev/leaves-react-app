import React, { ComponentType, FC, useContext } from "react"
import { Navigate, useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext"


const isAuth = (
    WrappedComponent: ComponentType,
    ): FC => (props) => {

    // const Component = (props) => {
        const {user} = useContext(AuthContext);
        const navigate = useNavigate();
        const isAuthenticated = user !== null;

        if (isAuthenticated) {
            return <WrappedComponent {...props} />
        }

            navigate('/login');
            return (<Navigate
                to={{
                    pathname: '/login',
                }}/>)
        

    }
    // return Component;
// };

export default isAuth;