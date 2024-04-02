"use client"
import FloatingButton from "@/components/FloatingButton";
import Navbar from "@/components/Navbar";
import React, {useState,useEffect} from "react";
import CourseCard from "@/components/CourseCard";
import axios from "axios";
import APIURL from "@/lib/variables";
import { getCookie } from "cookies-next";
import { useSelector, useDispatch } from "react-redux";
import { setCourses,addCourse,removeCourse } from "@/redux/coursesSlice";




export default  function Page() {
  const [courses, setCoursesData] = useState([]);
  const dispatch = useDispatch();
  const coursesState = useSelector(state => state.courses.courses);
  const [loading, setLoading] = useState(false);



  // const fetchCourses = async () => {
  //   const token = getCookie("token");
  //   const response = await axios.get(`${APIURL}/course/allCourses`, {
  //     withCredentials: true,
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  //   setCourses(response.data);
  //   console.log(response.data);
  // }
  // fetchCourses();

  useEffect(() => {
    if(coursesState.length === 0){
      axios.get(`${APIURL}/course/allCourses`, {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
        withCredentials: true,
      }).then((res) => {
        dispatch(setCourses(res.data));
        setCoursesData(res.data);
      });

    }
    else{
      setCoursesData(coursesState);
    }
   


  }
  , []);
  
  return (
    <div className="container dashboard h-screen">
    <div className="w-full h-screen flex flex-col">
      <Navbar />

     
      <div
        className="grid lg:grid-cols-4 gap-4 p-4 w-full h-full overflow-y-auto
        md:grid-cols-3 sm:grid-cols-2  grid-cols-1
        "
      > 
      {loading && <div className="w-full h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>}
      
        {courses?.map((course) => (
          <CourseCard key={course.courseID} course={course} />
        ))}
        {courses?.length === 0 && (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-lg font-semibold text-gray-500">
              No courses available
            </p>
          </div>
        )}
        
      </div>
    </div>
     <FloatingButton />
     </div>
  );
}
