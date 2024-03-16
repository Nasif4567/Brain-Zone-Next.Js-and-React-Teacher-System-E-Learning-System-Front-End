import {createSlice } from '@reduxjs/toolkit';


const coursesSlice = createSlice({
    name: 'courses',
    initialState: {
        courses: [],
    },
    reducers: {
        setCourses: (state, action) => {
            state.courses = action.payload;
        },
        addCourse: (state, action) => {
            state.courses.push(action.payload);
        },
        removeCourse: (state, action) => {
            state.courses = state.courses.filter(course => course.id !== action.payload);
        },
    },
});

export const {setCourses, addCourse, removeCourse} = coursesSlice.actions;
export default coursesSlice.reducer;