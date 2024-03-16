'use client'
import React,{useState} from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    } from "@/components/ui/card"
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import EditCourseDetailsDialog from './EditCourseDetailsDialog';
export default function CourseCard({course}) {
    const [openDialog, setOpenDialog] = useState(false)
  return (
    <>
     <Card key={course.courseID} className='h-fit '>
            <CardHeader>
                <img
                src={"https://source.unsplash.com/1600x900/?" + course.courseTitle}
                alt={course.courseTitle}
                className='w-full h-40 object-cover'
                />
            </CardHeader>
            <CardContent>
                <CardTitle className='h-fit my-2'>{course.courseName}</CardTitle>
                <CardDescription className=''>{course.courseDescription}</CardDescription>
            </CardContent>
            <CardFooter className='flex flex-col items-start space-y-2'>
                <div className='flex flex-col'>
                <p className='text-sm my-1'>
                    
                Duration:    {course.courseDuration} </p>
                <p className='text-sm my-1'>
                 Course Diffculty:   {course.courseDifficulty?.charAt(0).toUpperCase() + course.courseDifficulty?.slice(1)} </p>
                </div>
                
                <div className='flex justify-between space-x-2'>
                    
                    <Link href={`/course/${course.courseID}`}>
                    <Button className='bg-cyan-700' >View</Button>
                    </Link>
                    <Button variant='outline'
                    onClick= {
                        () => setOpenDialog(true)
                    }
                    >Edit</Button>
                    
                </div>
            </CardFooter>
            </Card>
            <EditCourseDetailsDialog course={course} open={openDialog} setOpen={setOpenDialog} />
    </>
  )
}
