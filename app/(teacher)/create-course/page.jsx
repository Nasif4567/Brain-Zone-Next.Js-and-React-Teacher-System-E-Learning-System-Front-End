"use client";
// External imports
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import ClipLoader from "react-spinners/ClipLoader";
import { useRouter } from "next/navigation";

// Internal imports
import APIURL from "@/lib/variables";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

export default function Page() {
  const { toast } = useToast();
  const [steps, setSteps] = useState(0);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const incrementSteps = () => setSteps(steps + 1);

  const [courseData, setCourseData] = useState({
    name: "",
    description: "",
    category: "",
    length: "",
    price: "",
    difficulty: "",
    language: "",
    outcome: "",
  });

  const categories = [
    { label: "Web Development", value: "web-development" },
    { label: "Mobile Development", value: "mobile-development" },
    { label: "Data Science", value: "data-science" },
    { label: "Artificial Intelligence", value: "artificial-intelligence" },
    { label: "Cyber Security", value: "cyber-security" },
    { label: "Game Development", value: "game-development" },
    { label: "Design", value: "design" },
    { label: "Other", value: "other" },
  ];

  const difficulties = [
    { label: "Beginner", value: "beginner" },
    { label: "Intermediate", value: "intermediate" },
    { label: "Advanced", value: "advanced" },
  ];

  const languages = [
    { label: "English", value: "english" },
    { label: "French", value: "french" },
    { label: "Spanish", value: "spanish" },
    { label: "German", value: "german" },
    { label: "Chinese", value: "chinese" },
    { label: "Japanese", value: "japanese" },
    { label: "Arabic", value: "arabic" },
    { label: "Other", value: "other" },
  ];

  const createCourse = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`${APIURL}/course/create`, courseData, {
        withCredentials: true,
      });
     
      if (res.status === 200 && res.data.message === "Course created successfully") {
        toast({
          title: "Course created successfully",
          description: "You have successfully created a new course",
        });
        router.push(`/course/${res.data.courseID}`);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="parent-container w-full h-screen flex flex-col p-10">
      <div className="flex w-full h-fit">
        {steps !== 2 && (
          <Link href="/">
            <Button variant="outline">Cancel</Button>
          </Link>
        )}
      </div>

      <div className="container flex w-1/2 mx-auto justify-center items-center h-screen">
        <Card className="w-[450px]">
          <CardHeader>
            <CardTitle>
              {steps === 0 && "Create a new course"}
              {steps === 1 && "Create a new course"}
              {steps === 2 && "Please Wait..."}
            </CardTitle>
            <CardDescription>
              {steps === 0 &&
                "Fill in the details below to create a new course"}
              {steps === 1 &&
                "Fill in the details below to create a new course"}
              {steps === 2 && "Creating your course"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              {steps === 0 && (
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="Name of your project"
                      value={courseData.name}
                      onChange={(e) =>
                        setCourseData({ ...courseData, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Description"
                      value={courseData.description}
                      onChange={(e) =>
                        setCourseData({
                          ...courseData,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      options={categories}
                      onChange={(e) =>
                        setCourseData({ ...courseData, category: e.value })
                      }
                    />
                  </div>
                </div>
              )}
              {steps === 1 && !loading && (
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Course Length</Label>
                    <Input
                      id="name"
                      placeholder="Length"
                      value={courseData.length}
                      onChange={(e) =>
                        setCourseData({ ...courseData, length: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="description">Price</Label>
                    <Input
                      id="description"
                      type="number"
                      placeholder="Price"
                      value={courseData.price}
                      onChange={(e) =>
                        setCourseData({ ...courseData, price: e.target.value })
                      }
                    />
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="category">Difficulty</Label>
                    <Select
                      options={difficulties}
                      onChange={(e) =>
                        setCourseData({ ...courseData, difficulty: e.value })
                      }
                     
                    />

                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="category">Language</Label>
                      <Select
                        options={languages}
                        onChange={(e) =>
                          setCourseData({ ...courseData, language: e.value })
                        }
                       
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="category">Outcome</Label>
                      <Textarea
                        id="description"
                        placeholder="Outcome"
                        value={courseData.outcome}
                        onChange={(e) =>
                          setCourseData({
                            ...courseData,
                            outcome: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              )}
              {loading && (
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col items-center space-y-1.5">
                    <ClipLoader color="#000" />
                  </div>
                </div>
              )}
            </form>
          </CardContent>
          <CardFooter className="flex justify-end">
            {steps === 1 && (
              <Button
                className="m-2"
                variant="outline"
                onClick={() => setSteps(steps - 1)}
              >
                Back
              </Button>
            )}
            {steps === 0 && (
              <Button
                className="m-2"
                onClick={incrementSteps}
                disabled={
                  !courseData.name ||
                  !courseData.description ||
                  !courseData.category
                }
              >
                Next
              </Button>
            )}
            {steps === 1 && (
              <Button
                className="m-2"
                onClick={createCourse}
                disabled={
                  !courseData.length ||
                  !courseData.price ||
                  !courseData.difficulty ||
                  !courseData.language ||
                  !courseData.outcome || loading
                }
              >
                Create
              </Button>
            )}

            {steps === 2 && (
              <Button className="m-2" variant="outline" 
                disabled={loading} > 
                Cancel
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
