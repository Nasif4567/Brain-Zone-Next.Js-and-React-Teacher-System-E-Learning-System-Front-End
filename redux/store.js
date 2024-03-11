import {configureStore} from '@reduxjs/toolkit';
import {useSelector} from 'react-redux';
import authSlice from './authSlice';

export const store = configureStore({
    reducer: {
        // Add reducers here
        auth: authSlice,
    }
    });




export const useAppSelector = useSelector;