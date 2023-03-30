import { useContext } from 'react';
import {useLocation, useNavigate} from 'react-router-dom'
import AuthContext from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';


const PrivateRoute = (props: { children: React.ReactNode }): JSX.Element => {
    const { children } = props
    const { user } = useContext(AuthContext);
    const isLoggedIn: boolean = user !== null;
    const location = useLocation()
  
    return isLoggedIn ? (
      <>{children}</>
    ) : (
      <Navigate
        replace={true}
        to="/login"
        state={{ from: `${location.pathname}${location.search}` }}
      />
    )
  }

  export default PrivateRoute;