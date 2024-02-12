'use client'
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

export default function Home() {
  return (
    <div className="container dashboard h-screen">
      <Navbar />
      <div className="flex justify-center items-start h-fit w-full ">
        <div className="statOne w-1/3 m-2 p-2 h-56 bg-cyan-200 flex items-center justify-center rounded-sm">
          <div className="flex flex-col items-center">
            <h1 className="text-4xl font-bold">20</h1>
            <p className="text-lg font-semibold">Courses</p>
          </div>
        </div>
        <div className="statTwo w-1/3 m-2 p-2 h-56 bg-blue-200 flex items-center justify-center rounded-sm">
          <div className="flex flex-col items-center">
            <h1 className="text-4xl font-bold">20</h1>
            <p className="text-lg font-semibold">Students</p>
          </div>
        </div>
        <div className="statThree w-1/3 m-2 p-2 h-56 bg-violet-200 flex items-center justify-center rounded-sm">
          <div className="flex flex-col items-center">
            <h1 className="text-4xl font-bold">12</h1>
            <p className="text-lg font-semibold">Assestment Due</p>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-start h-fit w-full">
        <div className="w-1/2 m-2 p-10 h-fit  border-black shadow-md rounded-md">
          <h1 className="text-2xl font-bold m-2">Courses</h1>
          <Table>
            <TableCaption>Course List</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Name</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Assestments</TableHead>
                <TableHead>Students</TableHead>
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
        </div>
        <div className="w-1/2 m-2 p-10 h-fit  border-black shadow-md rounded-md">
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
        </div>
      </div>
      {/* persistent button at the bottom right to add new course & Assestment */}
      <div className="fixed bottom-10 right-10">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <button className="bg-blue-500 text-white w-14 h-14 text-3xl rounded-full">
              +
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Create Course</DropdownMenuItem>
            <DropdownMenuItem>Create Assestment</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
