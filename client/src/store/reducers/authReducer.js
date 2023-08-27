// authReducer.js
import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: null,
        isAuthenticated: false,
    },
    reducers: {
        setCredentials: (state, action) => {
            state.token = action.payload;
            state.isAuthenticated = !!action.payload;
        },
        // setUser: (state, action) => {
        //     state.user = action.payload;
        //     state.isAuthenticated = !!action.payload;
        // },
        clearUser: (state) => {
            state.token = null;
            state.isAuthenticated = false;
        },
    },
});

export const loadUserFromCookies = () => (dispatch) => {
    const token = Cookies.get('authData');
    if (token) {
        // Load user data from the token and check if it's still valid
        const decodedToken  = jwtDecode(token);
        const expiresAt = decodedToken.exp * 1000; // Convert to milliseconds

        const currentTime = Date.now();
        if (expiresAt > currentTime) {
            Cookies.set('authData', token);
            dispatch(setCredentials(token));
        } else {
            // Clear invalid token
            Cookies.remove('authData');
            dispatch(clearUser());
        }
    }
};

export const { setCredentials, clearUser } = authSlice.actions;

export default authSlice.reducer;
