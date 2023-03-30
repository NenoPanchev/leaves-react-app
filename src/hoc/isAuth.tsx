import React, { ComponentType, FC, useContext, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext"


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