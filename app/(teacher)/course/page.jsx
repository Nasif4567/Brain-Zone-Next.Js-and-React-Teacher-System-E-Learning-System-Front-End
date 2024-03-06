import FloatingButton from "@/components/FloatingButton";
import Navbar from "@/components/Navbar";
import React from "react";
import CourseCard from "@/components/CourseCard";

export default function page() {
  const courses = [
    {
      id: 1,
      title: "Introduction to Computer Science",
      description: "This is an introductory course to computer science",
      students: 20,
      assestments: 3,
      rating: 4,
      reviews: 20,
      difficulty: "Beginner",
      price: 2,
      outcome: "Learn the basics of computer science",
      language: "Javascript",

      image: "https://source.unsplash.com/random",
    },
    {
        id:2,
        title:"Introduction to Python",
        description:"This is an introductory course to Python",
        students:20,
        assestments:3,
        rating:4,
        reviews:20,
        difficulty:"Beginner",
        price:2,
        outcome:"Learn the basics of Python",
        language:"Python",
        image:"https://source.unsplash.com/random"
    
    },
    {
        id:3,
        title:"Introduction to Java",
        description:"This is an introductory course to Java",
        students:20,
        assestments:3,
        rating:4,
        reviews:20,
        difficulty:"Beginner",
        price:2,
        outcome:"Learn the basics of Java",
        language:"Java",
        image:"https://source.unsplash.com/random"
    }

  ];
  return (
    <div className="w-full h-screen flex flex-col">
      <Navbar />

      <FloatingButton />
      <div
        className="grid lg:grid-cols-4 gap-4 p-4 w-full h-full overflow-y-auto
        md:grid-cols-3 sm:grid-cols-2  grid-cols-1
        "
      >
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}
