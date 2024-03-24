"use client";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { CaretSortIcon, DownloadIcon } from "@radix-ui/react-icons";
import Image from 'next/image'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PDFViewer from "@/components/PDFViewer";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import {useDispatch, useSelector} from 'react-redux';
import { setCourseContent, addNewContent,clearCourseContent,deleteContent,updateContent } from "@/redux/courseContentSlice";
import APIURL from "@/lib/variables";
export default function Page({params}) {
  const id = params.id;
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const { toast } = useToast();
  const [courseContent, setCourseContentLocal] = useState([
  ]);
  const courseContentData = useSelector((state) => state.course?.courseContent);
  const courseDataSlice = useSelector((state) => state.course?.courseData);
  const dispatch = useDispatch();



  const [contentName, setContentName] = useState("");
  const [contentDescription, setContentDescription] = useState("");
  const [courseData, setCourseData] = useState();
  const [loading , setLoading] = useState(true);
  const [selectedContentID, setSelectedContentID] = useState(null)  ;
  const [selectedContent, setSelectedContent] = useState(null);
  const [editContent, setEditContent] = useState(null);
  



  const clickedContent = (contentID) => {
    setSelectedContentID(contentID);
    const content = courseContentData.find((content) => content.contentID === contentID);
    setSelectedContent(content);
  }


async function saveEdit() {
  const formData = new FormData();
  formData.append('file', editContent?.newFile);
  formData.append('title', editContent?.contentTitle);
  formData.append('description', editContent?.contentDescription);
  formData.append('contentID', editContent?.contentID);
 
  try{
    const response = await axios.put(`${APIURL}/content/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      withCredentials: true
    });
    console.log(response);

    toast({
      title: "Content edited successfully",
      description: "You have successfully edited a content",
    });

    if(response.status === 200){
     dispatch(updateContent(
      {
        contentID: editContent?.contentID,
        courseID: id,
        contentTitle: response.data.contentTitle,
        contentDescription: response.data.contentDescription,
        contentURL: response.data.contentURL,
        fileType: response.data.fileType,
      }
     )
     )
      setEditOpen(false);
      
      setSelectedContentID(null);
      setSelectedContent(null);
      setSelectedContentID(editContent?.contentID);
      //replace the url with the new url and file type
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


 

    useEffect(() => {
      async function fetchCourseContent() {
        try {
          setLoading(true);
          const response = await axios.get(`http://localhost:3002/content/${id}`, {
            withCredentials: true,
          });
          if(response.status === 200){
          
            if(response?.data?.content?.length > 0){
              
              dispatch(setCourseContent(
                {
                  courseContent: response.data.content,
                  courseData: response.data.course
                }
              ));
              setCourseContentLocal(response.data.content);
              
              
             
            }
            else {
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
     if(courseDataSlice?.courseID !== id){
        dispatch(clearCourseContent());
      
      fetchCourseContent();
     }
    }, [id]);

useEffect(() => {
  console.log(loading);
}, [loading]);
  

  async function addToList() {
    const formData = new FormData();
    formData.append('file', document.querySelector('#file').files[0]);
    formData.append('title', contentName);
    formData.append('description', contentDescription);
    formData.append('type', 'pdf');
    
    try{
  
    const response = await axios.post(`${APIURL}/content/upload/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      withCredentials: true
    });
    console.log(response);

    toast({
      title: "Content added successfully",
      description: "You have successfully added a new content",
    });

    if(response.status === 200){
     dispatch(addNewContent(
      {
        contentID: response.data.contentID,
        courseID: id,
        contentTitle: contentName,
        contentDescription: contentDescription,
        contentURL: response.data.contentURL,
        fileType: response.data.fileType
      }
     ))
      setOpen(false);
    }
  } catch (error) {
    console.log(error);
  }
  
    
  }

  return (
    <>
      <Navbar />
      
      {courseContentData  !== null && loading === false && (
      <div className="course-container flex flex-col w-11/12 h-fit mx-auto">
        <div className="course-header flex justify-between items-center w-full h-20 bg-white">
          <h1 className="text-2xl font-bold p-4">
            {courseData?.courseName}
            <span className="text-lg font-normal"> - Course Code</span>
            <span className="text-sm font-normal">
              <Button className="ml-4">Forum</Button>
            </span>
          </h1>
          <div className="flex space-x-4 p-4">
            <Button variant="outline" onClick={() => setOpen(true)}>
              Add Content
            </Button>
          </div>
        </div>
        <div className="course-content flex w-full h-fit ">
          <div className="course-sidebar w-1/5 h-full m-2  p-4 select-none">
            <h2 className="text-xl font-bold my-2">Content</h2>
            <ul className="space-y-2">
              {courseContentData?.map((content) => (
                
                <li
                  key={content.contentID}
                  onClick={() => clickedContent(content.contentID)}
                  className="text-lg  p-5 flex flex-col rounded-sm shadow-md transition-all cursor-pointer duration-300 hover:bg-gray-100"
                >
                  {
                    content.contentTitle
                  }
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
                <h2 className="text-2xl font-bold">No Content Available</h2>
                <p className="text-sm font-normal"> Add content to your course</p>
              </div>
            </div>
          
          )}
          {selectedContentID === null && (
            <div className="course-main w-4/5 h-full bg-white p-4">
              <div className="w-full flex flex-col justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">Select a content</h2>
                <p className="text-sm font-normal"> Click on a content to view</p>
              </div>
            </div>
          )}
          {selectedContent &&  (
          <div className="course-main w-4/5 h-full bg-white p-4">
            <div className="w-full flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">
                  {selectedContent?.contentTitle}
              </h2>
              <Button onClick={() => {
              setEditOpen(true);
              setEditContent(selectedContent);
              }}>Edit</Button>
            </div>
            
              <div className="flex items-center justify-between space-x-4 px-4 w-full">
                <h4 className="text-sm font-semibold">
                  {selectedContent?.contentDescription}
                </h4>
                <div>
                 
                  <Button variant="ghost" size="sm"

                  onClick={() => {
                    window.open(selectedContent?.contentURL, '_blank');
                  }}
                  >
                    <DownloadIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              
              
                <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
                  {selectedContent?.fileType === "application/pdf" && (
                  <PDFViewer pdfURL={
                    selectedContent?.contentURL
                  
                  } />
                  )}
            
                  {selectedContent?.fileType.includes("image") && (
                    <Image src={selectedContent?.contentURL} alt="content" width={500} height={500}
                    className="rounded-md shadow-md w-full"
                    />
                  )}
                  {selectedContent?.fileType.includes("video") && (
                    <video src={selectedContent?.contentURL} controls className="rounded-md shadow-md w-full"></video>
                  
                  )}


                </div>
              
           
            
          </div>
          )}
        </div>
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
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Course Content</DialogTitle>
            <DialogDescription>Edit your course content</DialogDescription>
          </DialogHeader>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Content Name</Label>
              <Input id="name" placeholder="Title of your content"
              value={editContent?.contentTitle}
              onChange={(e) => setEditContent({...editContent, contentTitle: e.target.value})}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="description">Content Description</Label>
              <Input id="description" placeholder="Description" 
              value={editContent?.contentDescription}
              onChange={(e) => setEditContent({...editContent, contentDescription: e.target.value})}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="category">Uploaded File</Label>
              <div className="flex items-center space-x-4">
                <p className={`text-sm font-semibold
                  hover:underline cursor-pointer text-blue-500 ${editContent?.newFile && 'line-through'} ${editContent?.newFile && 'text-red-500'}
                
                `}>
                  {editContent?.contentURL.split('/').pop()}
                </p>
                <Button variant="ghost" size="sm"
                onClick={() => {
                  window.open(editContent?.contentURL, '_blank');
                }
                }
                >
                  Open File
                </Button>


                
                
                </div>
                <Input type="file" id="file" placeholder="Replace File" 
                onChange={(e) => {
                  setEditContent({...editContent, 
                  newFile: e.target.files[0]
                  })
                }
                }
                />

                
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setEditOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              saveEdit();
              setEditOpen(false);
            }}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
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
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Assesstment Name</Label>
                <Input id="name" placeholder="Title of your content" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">Assesstment Description</Label>
                <Input id="description" placeholder="Description" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="category">Due Date</Label>
                <Input type="date" id="date" />
              </div>
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
                  addToList();
                  setOpen(false);
                  setContentName("");
                  setContentDescription("");
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
