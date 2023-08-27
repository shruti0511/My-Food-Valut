// useAuth.js
import jwtDecode from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser, setCredentials } from '../store/reducers/authReducer';

const useAuth = () => {
    const dispatch = useDispatch()

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    const token = useSelector(state => state.auth.token)

    let isAdmin = false
    let status = "User"

    const loginFun = async (token) => {
        try {
            dispatch(setCredentials(token));
            console.log('its useauth', token);
        } catch (error) {
            // Handle login error
            console.log(error, "error while ...");
        }
    };
    const logoutFun = async () => {
        try {
            dispatch(clearUser());
        } catch (error) {
            // Handle login error
            console.log(error, "error while ...");
        }
    };

    if (token) {
        const decoded = jwtDecode(token)
        const userInfo = decoded.UserInfo
        const roles = userInfo.roles

        isAdmin = roles.includes('Admin')

        if (isAdmin) status = "Admin"

        return {
            isAuthenticated,
            loginFun,
            logoutFun,
            token,
            userInfo, roles, status, isAdmin
        }
    }

    //return { name: '',email:'', roles: [],  isAdmin, status ,token}
    return {
        isAuthenticated,
        loginFun,
        logoutFun,
        token,
        userInfo: null,
        roles: [],
        status,
        isAdmin
    }

};

export default useAuth;
