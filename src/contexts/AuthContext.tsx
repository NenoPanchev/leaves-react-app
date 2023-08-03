import {createContext} from 'react';
import { UserDetails } from '../models/objects/UserDetails';

interface IAuthContext {
    user: UserDetails | null;
    setUser: React.Dispatch<React.SetStateAction<UserDetails | null>>
}
const initUser = {
    user: new UserDetails(),
};

const AuthContext = createContext<IAuthContext>(
    {} as IAuthContext
);

export default AuthContext