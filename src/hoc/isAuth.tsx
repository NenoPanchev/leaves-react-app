import React, { ComponentType, FC, useContext, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext"


const isAuth = (
    WrappedComponent: ComponentType,
): FC => (props) => {

    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    // const isAuthenticated = user !== null;
    const isAuthenticated = localStorage.getItem('Authenticated') == 'true';
    let isInitialRender = useRef(true);

    if (isAuthenticated) {
        return <WrappedComponent {...props} />
    } else {
        console.log("unauthorized");
        useEffect( () => {
                navigate('/login')
        }, [])
        return null;


    }
}

export default isAuth;