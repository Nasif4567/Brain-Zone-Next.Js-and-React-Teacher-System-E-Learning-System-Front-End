"use client"
import Image from "next/image";
import Navbar from "@/components/Navbar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import FloatingButton from "@/components/FloatingButton";
import axios from "axios";
import APIURL from "@/lib/variables";
import { useEffect,useState} from "react";
import{useRouter} from "next/navigation";
import{useDispatch,useSelector} from "react-redux";
import { setCourses } from "@/redux/coursesSlice";



export default function Home() {

  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const coursesState = useSelector(state => state.courses.courses);
  const [coursesData, setCoursesData] = useState([]);
  const [assesstmentsData, setAssesstmentsData] = useState([]);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }
  , [user]);

  useEffect(() => {
    try{
    if(coursesState.length === 0){
      axios.get(`${APIURL}/course/allCourses`, {
        
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
  catch(e){
    console.log(e);
  }
   


  }, []);

  useEffect(() => {
    try{
    if(user){
      axios.get(`${APIURL}/assestment/allByTeacher`, {
        
        withCredentials: true,
      }).then((res) => {
        setAssesstmentsData(res.data);
      });

    }
  }
  catch(e){
    console.log(e);
  }
}, [user]);

  
  return (
    <>
    {user && (
    <div className="container dashboard h-screen">
      <Navbar />
      <div className="flex justify-center items-start h-fit w-full ">
        <div className="statOne w-1/3 m-2 p-2 h-56 bg-cyan-200 flex items-center justify-center rounded-sm">
          <div className="flex flex-col items-center">
            <h1 className="text-4xl font-bold">

              {coursesData?.length}
            </h1>
            <p className="text-lg font-semibold">Courses</p>
          </div>
        </div>
        {/* <div className="statTwo w-1/3 m-2 p-2 h-56 bg-blue-200 flex items-center justify-center rounded-sm">
          <div className="flex flex-col items-center">
            <h1 className="text-4xl font-bold">20</h1>
            <p className="text-lg font-semibold">Ass</p>
          </div>
        </div> */}
        <div className="statThree w-1/3 m-2 p-2 h-56 bg-violet-200 flex items-center justify-center rounded-sm">
          <div className="flex flex-col items-center">
            <h1 className="text-4xl font-bold">
              {assesstmentsData?.length}
            </h1>
            <p className="text-lg font-semibold">Assestments created</p>
          </div>
        </div>
      </div>
      {coursesTable()}
      
      <FloatingButton />
    </div>
    )}
    {!user && (
      <div className="flex justify-center items-center h-screen w-full">
        
      </div>
    
    )}
    </>
  );

  function coursesTable() {
    return <div className="flex justify-center items-start h-fit w-full">
      <div className="w-2/3 mx-auto my-2 p-4 h-fit  border-black shadow-md rounded-md">
        <h1 className="text-2xl font-bold m-2">Courses</h1>
        <Table>
          <TableCaption>Course List</TableCaption>
          <TableHeader>
            
            <TableRow>
              
              <TableHead>Name</TableHead>
              <TableHead>Assestments</TableHead>
              <TableHead> Category</TableHead>
              <TableHead>Course Description</TableHead>
              
            </TableRow>
           
          </TableHeader>
          <TableBody>
          
            

            {coursesData?.map((course) => (
              <TableRow key={course.courseID}
              className="cursor-pointer"
              onClick={() => router.push(`/course/${course.courseID}`)}
              >
                
                <TableCell>{course.courseName}</TableCell>
                
                <TableCell>{course.coursePrice} USD</TableCell>
                <TableCell>{course.courseCategory}</TableCell>
                <TableCell>{course.courseDescription}</TableCell>
                
              </TableRow>
            ))}
           
            
            
          </TableBody>
        </Table>
      </div>
      {/* <div className="w-1/2 m-2 p-10 h-fit  border-black shadow-md rounded-md">
        <h1 className="text-2xl font-bold m-2">Students</h1>
        <Table>
          <TableCaption>Student List</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Courses</TableHead>
              <TableHead>Assestments</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Mathematics</TableCell>
              <TableCell>Math101</TableCell>
              <TableCell>3 Assignments</TableCell>
              <TableCell>20</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Physics</TableCell>
              <TableCell>Phy101</TableCell>
              <TableCell>3 Exams</TableCell>
              <TableCell>20</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Chemistry</TableCell>
              <TableCell>Chem101</TableCell>
              <TableCell>3 Quiz</TableCell>
              <TableCell>20</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div> */}
    </div>;
  }
}
