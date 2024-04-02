"use client";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";

import { DownloadIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PDFViewer from "@/components/PDFViewer";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useDispatch, useSelector } from "react-redux";
import EditContentDialog from "@/components/EditContentDialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  setCourseContent,
  addNewContent,
  clearCourseContent,
  deleteContent,
  updateContent,
} from "@/redux/courseContentSlice";
import APIURL from "@/lib/variables";
import { useRouter } from "next/navigation";

export default function Page({ params }) {
  const router = useRouter();
  const id = params.id;
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const { toast } = useToast();
  const [courseContent, setCourseContentLocal] = useState([]);
  const courseContentData = useSelector((state) => state.course?.courseContent);
  const courseDataSlice = useSelector((state) => state.course?.courseData);
  const dispatch = useDispatch();

  const [contentName, setContentName] = useState("");
  const [contentDescription, setContentDescription] = useState("");
  const [courseData, setCourseData] = useState();
  const [loading, setLoading] = useState(true);
  const [selectedContentID, setSelectedContentID] = useState(null);
  const [selectedContent, setSelectedContent] = useState(null);
  const [editContent, setEditContent] = useState(null);
  const [assestments, setAssestments] = useState([]);
  const [selectedAssestment, setSelectedAssestment] = useState(null);
  const [newAssesstmentTitle, setNewAssesstmentTitle] = useState("");
  const [newAssesstmentDescription, setNewAssesstmentDescription] =
    useState("");
  const [newAssesstmentQuestions, setNewAssesstmentQuestions] = useState([]);
  const [newAssesstmentQuestion, setNewAssesstmentQuestion] = useState("");
  const [newAssesstmentAnswer, setNewAssesstmentAnswer] = useState("");
  const [newAssesstmentDueDate, setNewAssesstmentDueDate] = useState("");

  const clickedContent = (contentID) => {
    setSelectedContentID(contentID);
    const content = courseContentData.find(
      (content) => content.contentID === contentID
    );
    setSelectedContent(content);
  };

  async function saveEdit() {
    const formData = new FormData();
    formData.append("file", editContent?.newFile);
    formData.append("title", editContent?.contentTitle);
    formData.append("description", editContent?.contentDescription);
    formData.append("contentID", editContent?.contentID);

    try {
      const response = await axios.put(`${APIURL}/content/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      console.log(response);

      toast({
        title: "Content edited successfully",
        description: "You have successfully edited a content",
      });

      if (response.status === 200) {
        dispatch(
          updateContent({
            contentID: editContent?.contentID,
            courseID: id,
            contentTitle: response.data.contentTitle,
            contentDescription: response.data.contentDescription,
            contentURL: response.data.contentURL,
            fileType: response.data.fileType,
          })
        );
        setEditOpen(false);

        setSelectedContentID(null);
        setSelectedContent(null);
        setSelectedContentID(editContent?.contentID);
        setSelectedContent({
          contentID: editContent?.contentID,
          courseID: id,
          contentTitle: response.data.contentTitle,
          contentDescription: response.data.contentDescription,
          contentURL: response.data.contentURL,
          fileType: response.data.fileType,
        });

        setEditContent(null);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function addToList() {
    const formData = new FormData();
    formData.append("file", document.querySelector("#file").files[0]);
    formData.append("title", contentName);
    formData.append("description", contentDescription);
    formData.append("type", "pdf");

    try {
      const response = await axios.post(
        `${APIURL}/content/upload/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      console.log(response);

      toast({
        title: "Content added successfully",
        description: "You have successfully added a new content",
      });

      if (response.status === 200) {
        dispatch(
          addNewContent({
            contentID: response.data.contentID,
            courseID: id,
            contentTitle: contentName,
            contentDescription: contentDescription,
            contentURL: response.data.contentURL,
            fileType: response.data.fileType,
          })
        );
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function addAssesstment() {
    if (newAssesstmentQuestions.length === 0) {
      toast({
        title: "No questions",
        description: "Please add questions to your assestment",
      });
      return;
    }
    if(newAssesstmentTitle === "" || newAssesstmentDescription === "" || newAssesstmentDueDate === ""){
      toast({
        title: "Empty fields",
        description: "Please fill in all fields",
      });
      return;
    }

    const formData = new FormData();
    formData.append("title", newAssesstmentTitle);
    formData.append("description", newAssesstmentDescription);
    formData.append("questionJSON", JSON.stringify(newAssesstmentQuestions));
    formData.append("assessmentDeadline", newAssesstmentDueDate);
    formData.append("generateAIQuestion", false);
    console.log(formData)
    try {
      const response = await axios.post(
        `${APIURL}/assestment/upload/${id}`,
        {
          title: newAssesstmentTitle,
          description: newAssesstmentDescription,
          questionJSON: JSON.stringify(newAssesstmentQuestions),
          assessmentDeadline: newAssesstmentDueDate,
          generateAIQuestion:false  

        },
        {
          
          withCredentials: true,
        }
      );
      console.log(response);

      toast({
        title: "Assestment added successfully",
        description: "You have successfully added a new assestment",
      });

      if (response.status === 200) {
        setAssestments([
          ...assestments,
          {
            assessmentID: response.data.assessmentID,
            courseID: id,
            assessmentTitle: newAssesstmentTitle,
            assessmentDescription: newAssesstmentDescription,
            assessmentURL: response.data.assessmentURL,
            questionsJson: newAssesstmentQuestions,
            assessmentDeadline: newAssesstmentDueDate,
          },
        ]);
        setNewAssesstmentTitle("");
        setNewAssesstmentDescription("");
        setNewAssesstmentQuestions([]);
        setNewAssesstmentDueDate("");
        setOpen(false);
      }
      setOpen(false);
      setContentName("");
      setContentDescription("");
      setNewAssesstmentAnswer("");
      setNewAssesstmentDescription("")
      setNewAssesstmentDueDate("")
      setNewAssesstmentTitle("")
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function fetchCourseContent() {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:3002/content/${id}`,
          {
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          if (response?.data?.content?.length > 0) {
            dispatch(
              setCourseContent({
                courseContent: response.data.content,
                courseData: response.data.course,
              })
            );
            setCourseContentLocal(response.data.content);
          } else {
            setCourseContent([]);
          }
          setCourseData(response.data.course);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
    async function fetchAssesstments() {
      try {
        setLoading(true);
        const response = await axios.get(`${APIURL}/assestment/all/${id}`, {
          withCredentials: true,
        });
        if (response.status === 200) {
            const jsonParsed = response.data.map((assesstment) => {
              return {
                ...assesstment,
                questionsJson: JSON.parse(assesstment.questionsJson),
              };
            });

          setAssestments(jsonParsed);
          console.log(jsonParsed);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
    if (courseDataSlice?.courseID !== id) {
      dispatch(clearCourseContent());

      fetchCourseContent();
      fetchAssesstments();
    }
  }, [id]);

  return (
    <>
      <Navbar />

      {courseContentData !== null && loading === false && (
        <div className="course-container flex flex-col w-11/12 h-fit mx-auto">
          <div className="course-header flex justify-between items-center w-full h-20 bg-white">
            <h1 className="text-2xl font-bold p-4">
              {courseData?.courseName}
              <span className="text-lg font-normal"> - Course Code</span>
              <span className="text-sm font-normal">
                <Button
                  onClick={() => router.push(`/forum/${id}`)}
                  className="ml-4"
                >
                  Forum
                </Button>
              </span>
            </h1>
            <div className="flex space-x-4 p-4">
              <Button variant="outline" onClick={() => setOpen(true)}>
                Add Content
              </Button>
            </div>
          </div>
          <Tabs defaultValue="content">
            <TabsList>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="assestments">Assestments</TabsTrigger>
            </TabsList>
            <TabsContent value="content" className="w-full h-full">
              <div className="course-content flex w-full h-fit ">
                <div className="course-sidebar w-1/5 h-full m-2  p-4 select-none">
                  <ul className="space-y-2">
                    {courseContentData?.map((content) => (
                      <li
                        key={content.contentID}
                        onClick={() => clickedContent(content.contentID)}
                        className="text-lg  p-5 flex flex-col rounded-sm shadow-md transition-all cursor-pointer duration-300 hover:bg-gray-100"
                      >
                        {content.contentTitle}
                        <span className="text-sm font-normal my-2">
                          {content?.contentDescription?.slice(0, 50)}
                        </span>
                      </li>
                    ))}
                    {courseContentData?.length === 0 && (
                      <li className="text-lg  p-5 flex flex-col rounded-sm shadow-md transition-all cursor-pointer duration-300 hover:bg-gray-100">
                        No content available
                      </li>
                    )}
                  </ul>
                </div>
                {courseContentData?.length === 0 && (
                  <div className="course-main w-4/5 h-full bg-white p-4">
                    <div className="w-full flex flex-col justify-between items-center mb-8">
                      <h2 className="text-2xl font-bold">
                        No Content Available
                      </h2>
                      <p className="text-sm font-normal">
                        {" "}
                        Add content to your course
                      </p>
                    </div>
                  </div>
                )}
                {selectedContentID === null && (
                  <div className="course-main w-4/5 h-full bg-white p-4">
                    <div className="w-full flex flex-col justify-between items-center mb-8">
                      <h2 className="text-2xl font-bold">Select a content</h2>
                      <p className="text-sm font-normal">
                        {" "}
                        Click on a content to view
                      </p>
                    </div>
                  </div>
                )}
                {selectedContent && (
                  <div className="course-main w-4/5 h-full bg-white p-4">
                    <div className="w-full flex justify-between items-center mb-8">
                      <h2 className="text-2xl font-bold">
                        {selectedContent?.contentTitle}
                      </h2>
                      <Button
                        onClick={() => {
                          setEditOpen(true);
                          setEditContent(selectedContent);
                        }}
                      >
                        Edit
                      </Button>
                    </div>

                    <div className="flex items-center justify-between space-x-4 px-4 w-full">
                      <h4 className="text-sm font-semibold">
                        {selectedContent?.contentDescription}
                      </h4>
                      <div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            window.open(selectedContent?.contentURL, "_blank");
                          }}
                        >
                          <DownloadIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
                      {selectedContent?.fileType === "application/pdf" && (
                        <PDFViewer pdfURL={selectedContent?.contentURL} />
                      )}

                      {selectedContent?.fileType.includes("image") && (
                        <Image
                          src={selectedContent?.contentURL}
                          alt="content"
                          width={500}
                          height={500}
                          className="rounded-md shadow-md w-full"
                        />
                      )}
                      {selectedContent?.fileType.includes("video") && (
                        <video
                          src={selectedContent?.contentURL}
                          controls
                          className="rounded-md shadow-md w-full"
                        ></video>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
            <TabsContent value="assestments">
              <div className="course-content flex w-full h-fit ">
                <div className="assestment-sidebar w-1/5 h-full m-2  p-4 select-none">
                  <ul className="space-y-2">
                    {assestments?.map((assesstment) => (
                      <li
                        key={assesstment.assessmentID}
                        onClick={() => {
                          setSelectedAssestment(assesstment);
                        }}
                        className="text-lg  p-5 flex flex-col rounded-sm shadow-md transition-all cursor-pointer duration-300 hover:bg-gray-100"
                      >
                        {assesstment.assessmentTitle}
                        <span className="text-sm font-normal my-2">
                          {assesstment?.assessmentDescription?.slice(0, 50)}
                        </span>
                      </li>
                    ))}
                    {assestments?.length === 0 && (
                      <li className="text-lg  p-5 flex flex-col rounded-sm shadow-md transition-all cursor-pointer duration-300 hover:bg-gray-100">
                        No assestments available
                      </li>
                    )}
                  </ul>
                </div>

                {selectedAssestment === null && (
                  <div className="assestment-main w-4/5 h-full bg-white p-4">
                    <div className="w-full flex flex-col justify-between items-center mb-8">
                      <h2 className="text-2xl font-bold">
                        Select an assestment
                      </h2>
                      <p className="text-sm font-normal">
                        {" "}
                        Click on an assestment to view
                      </p>
                    </div>
                  </div>
                )}
                {selectedAssestment && (
                  <div className="assestment-main w-4/5 h-full bg-white p-4">
                    <div className="w-full flex justify-between items-center mb-8">
                      <h2 className="text-2xl font-bold">
                        {selectedAssestment?.assessmentTitle}
                      </h2>
                      <Button
                        onClick={() => {
                          setEditOpen(true);
                          setEditContent(selectedAssestment);
                        }}
                      >
                        Edit
                      </Button>
                    </div>

                    <div className="flex items-center justify-between space-x-4 px-4 w-full">
                      <h4 className="text-sm font-semibold">
                        {selectedAssestment?.assessmentDescription}
                      </h4>
                      <div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            window.open(
                              selectedAssestment?.assessmentURL,
                              "_blank"
                            );
                          }}
                        >
                          <DownloadIcon className="h-4 w-4" />
                        </Button>
                      </div>
                      
                    </div>
                    <div className="flex flex-col space-y-2">
                        <h4 className="text-sm font-semibold">
                          Due Date: {new Date(selectedAssestment?.assessmentDeadline).toDateString()}
                        </h4>
                    
                        </div>
                        <div className="w-full h-fit p-2 rounded-sm my-2 bg-gray-200">
                      {selectedAssestment?.questionsJson?.map(
                        (question, index) => (
                          <div className="flex flex-col space-y-2">
                            <h4 className="text-sm font-semibold">
                              Question {index + 1}
                            </h4>
                            <Input value={question.question} disabled />
                            <p className="text-sm font-normal">
                              Answer: {question.answer}
                            </p>
                          </div>
                        )
                      )  
                      }
                      </div>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
      {loading && (
        <div className="container flex justify-center items-center w-11/12 h-screen mx-auto">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      )}
      {courseContentData === null && !loading && (
        <div className="container flex flex-col w-11/12 h-[90vh] mx-auto items-center justify-center">
          <p className="text-2xl font-bold">No content available</p>
          <p className="text-lg font-normal">Add content to your course</p>
          <Button onClick={() => setOpen(true)}>Add Content</Button>
        </div>
      )}

      {addCourseDialog()}
      {EditContentDialog(
        editOpen,
        setEditOpen,
        editContent,
        setEditContent,
        saveEdit
      )}
    </>
  );

  function addCourseDialog() {
    const [contentType, setContentType] = useState();
    const [step, setSet] = useState(0);
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Course Content</DialogTitle>
            <DialogDescription>Add content to your course</DialogDescription>
          </DialogHeader>
          {contentType === "notes" && step === 1 && (
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Content Name</Label>
                <Input
                  id="name"
                  placeholder="Title of your content"
                  value={contentName}
                  onChange={(e) => setContentName(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">Content Description</Label>
                <Input
                  id="description"
                  placeholder="Description"
                  value={contentDescription}
                  onChange={(e) => setContentDescription(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="category">Upload File</Label>
                <Input type="file" id="file" placeholder="Upload File" />
              </div>
            </div>
          )}

          {contentType === "assestments" && step === 1 && (
            <div className="flex flex-col w-full items-start gap-4 h-[70vh] overflow-y-scroll">
              <h2 className="text-2xl font-bold">Assestment Name</h2>
              <Input placeholder="Title of your assestment" 
              onChange={(e) => setNewAssesstmentTitle(e.target.value)}
              value={newAssesstmentTitle}
              />
              <Label htmlFor="description">Assestment Description</Label>
              <Input placeholder="Description" 
              onChange={(e) => setNewAssesstmentDescription(e.target.value)}
              
              />
              <Label htmlFor="duedate">Due Date</Label>
              <Input type="date" id="duedate" 
              onChange={(e) => setNewAssesstmentDueDate(e.target.value)}
              value={newAssesstmentDueDate}
              />
              <h2 className="text-2xl font-bold">Questions</h2>
              <div className="flex flex-col space-y-1.5 questions w-full">
                {newAssesstmentQuestions?.map((question, index) => (
                  <div key={index} className="flex flex-col space-y-1.5">
                    <Label htmlFor="question">Question {index + 1}</Label>
                    <Input
                      id="question"
                      placeholder="Question"
                      value={question.question}
                    />
                    <Input
                      id="answer"
                      placeholder="Answer"
                      value={question.answer}
                    />
                    <Button
                      variant="destructive"
                      onClick={() => {
                        setNewAssesstmentQuestions(
                          newAssesstmentQuestions.filter((q, i) => i !== index)
                        );
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                ))}

                <Label htmlFor="question">Question</Label>
                <Input
                  id="question"
                  placeholder="Question"
                  value={newAssesstmentQuestion}
                  onChange={(e) => setNewAssesstmentQuestion(e.target.value)}
                />
                <Input
                  id="answer"
                  placeholder="Answer"
                  value={newAssesstmentAnswer}
                  onChange={(e) => setNewAssesstmentAnswer(e.target.value)}
                />
              </div>

              <Button
                variant="ghost"
                onClick={() => {
                  if (
                    newAssesstmentQuestion === "" ||
                    newAssesstmentAnswer === ""
                  ) {
                    toast({
                      title: "Empty fields",
                      description: "Please fill in all fields",
                    });
                    return;
                  }

                  setNewAssesstmentQuestions([
                    ...newAssesstmentQuestions,
                    {
                      question: newAssesstmentQuestion,
                      answer: newAssesstmentAnswer,
                    },
                  ]);
                  setNewAssesstmentQuestion("");
                  setNewAssesstmentAnswer("");
                }}
              >
                Add Question
              </Button>
            </div>
          )}
          {step === 0 && (
            <div className="flex flex-row space-x-4">
              <Button
                variant="ghost"
                onClick={() => {
                  setSet(step + 1);
                  setContentType("notes");
                }}
              >
                Add Notes
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  setSet(step + 1);
                  setContentType("assestments");
                }}
              >
                Add Assesstments
              </Button>
            </div>
          )}
          {contentType === "notes" && (
            <DialogFooter>
              <Button
                variant="ghost"
                onClick={() => {
                  setSet(0);
                  setOpen(false);
                  setContentType("");
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  addToList();
                  setOpen(false);
                  setContentName("");
                  setContentDescription("");
                  setSet(0);
                  setContentType("");
                }}
              >
                Add Content
              </Button>
            </DialogFooter>
          )}

          {contentType === "assestments" && (
            <DialogFooter>
              <Button
                variant="ghost"
                onClick={() => {
                  setSet(0);
                  setOpen(false);
                  setContentType("");
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  addAssesstment();
                }}
              >
                Add Assesstment
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    );
  }
}
