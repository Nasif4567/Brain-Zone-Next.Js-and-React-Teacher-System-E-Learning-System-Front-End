import {createSlice} from '@reduxjs/toolkit';

const courseContentSlice = createSlice({
    name: 'courseContent',
    initialState: {
        courseContent: null,
    },
    reducers: {
        setCourseContent: (state, action) => {
            state.courseContent = action.payload;
        },
        clearCourseContent: (state) => {
            state.courseContent = null;
        },
        addNewContent: (state, action) => {
            state.courseContent.push(action.payload);
        },

    },
});


export const {setCourseContent, clearCourseContent, addNewContent} = courseContentSlice.actions;
export default courseContentSlice.reducer;
