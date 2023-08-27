// import { createStore } from 'redux';
// import reducer from './reducer';
import customizationReducer from './customizationReducer';

// // ==============================|| REDUX - MAIN STORE ||============================== //

// const store = createStore(reducer);
// const persister = 'Free';

// export { store, persister };


import { configureStore } from '@reduxjs/toolkit';
import authReducer, { loadUserFromCookies } from '../store/reducers/authReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    customization: customizationReducer
  },
});
store.dispatch(loadUserFromCookies());
// export default store;
const persister = 'Free';

export { store, persister };
