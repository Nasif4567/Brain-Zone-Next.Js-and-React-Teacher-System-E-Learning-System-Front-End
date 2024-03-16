import {configureStore} from '@reduxjs/toolkit';
import {useSelector} from 'react-redux';
import authSlice from './authSlice';
import courseContentSlice from './courseContentSlice';
import coursesSlice from './coursesSlice';

export const store = configureStore({
    reducer: {
        // Add reducers here
        auth: authSlice,
        course : courseContentSlice,
        courses : coursesSlice,
    }
    });




export const useAppSelector = useSelector;