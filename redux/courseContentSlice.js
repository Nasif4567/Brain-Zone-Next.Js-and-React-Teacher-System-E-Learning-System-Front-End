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
        deleteContent: (state, action) => {
            state.courseContent = state.courseContent.filter((content) => content.contentID !== action.payload);
        },
        updateContent (state, action) {
            state.courseContent = state.courseContent.map((content) => {
                if (content.contentID === action.payload.contentID) {
                    return action.payload;
                }
                return content;
            }
            );
        }

    },
});


export const {setCourseContent, clearCourseContent, addNewContent,deleteContent,updateContent} = courseContentSlice.actions;
export default courseContentSlice.reducer;
