import {createSlice} from '@reduxjs/toolkit';

const courseContentSlice = createSlice({
    name: 'courseContent',
    initialState: {
        courseContent: null,
        courseData: null,
    },
    reducers: {
        setCourseContent: (state, action) => {
            const {courseContent, courseData} = action.payload;
            state.courseContent = courseContent;
            state.courseData = courseData;
        },
        clearCourseContent: (state) => {
            state.courseContent = null;
            state.courseData = null;
        },
        addNewContent: (state, action) => {
            state.courseContent = [...state.courseContent, action.payload];
        },

    },
});


export const {setCourseContent, clearCourseContent, addNewContent} = courseContentSlice.actions;
export default courseContentSlice.reducer;
