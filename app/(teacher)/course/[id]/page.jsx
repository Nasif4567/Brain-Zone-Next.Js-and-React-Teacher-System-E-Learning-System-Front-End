"use client";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { CaretSortIcon, DownloadIcon } from "@radix-ui/react-icons";
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

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [courseContent, setCourseContent] = useState([
    {
      id: 1,
      title: "Course Content 1",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt nisi soluta aspernatur consectetur neque molestias nobis reiciendis cum. Qui tempore accusamus placeat laudantium sed....",
      pdfURL: "https://www.abdullahibnshahin.com/detailedcv.pdf",
    },
    {
      id: 2,
      title: "Course Content 2",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt nisi soluta aspernatur consectetur neque molestias nobis reiciendis cum. Qui tempore accusamus placeat laudantium sed....",
      pdfURL: "https://www.abdullahibnshahin.com/detailedcv.pdf",
    },
  ]);

  const [contentName, setContentName] = useState("");
  const [contentDescription, setContentDescription] = useState("");

  const addToList = () => {
    setCourseContent([
      ...courseContent,
      {
        id: courseContent.length + 1,
        title: contentName,
        description: contentDescription,
      },
    ]);
    setOpen(false);
  };

  return (
    <>
      <Navbar />
      <div className="course-container flex flex-col w-11/12 h-fit mx-auto">
        <div className="course-header flex justify-between items-center w-full h-20 bg-white">
          <h1 className="text-2xl font-bold p-4">
            Course Name
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
              {courseContent.map((content) => (
                <li
                  key={content.id}
                  className="text-lg  p-5 flex flex-col rounded-sm shadow-md transition-all cursor-pointer duration-300 hover:bg-gray-100"
                >
                  {content.title}
                  <span className="text-sm font-normal my-2">
                    {content.description.slice(0, 50)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="course-main w-4/5 h-full bg-white p-4">
            <div className="w-full flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Course Content 1</h2>
              <Button onClick={() => setEditOpen(true)}>Edit</Button>
            </div>
            <Collapsible
              open={isOpen}
              onOpenChange={setIsOpen}
              className="w-full space-y-2"
            >
              <div className="flex items-center justify-between space-x-4 px-4 w-full">
                <h4 className="text-sm font-semibold">Course Content 1</h4>
                <div>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <CaretSortIcon className="h-4 w-4" />
                      <span className="sr-only">Toggle</span>
                    </Button>
                  </CollapsibleTrigger>
                  <Button variant="ghost" size="sm">
                    <DownloadIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {!isOpen && (
                <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Incidunt nisi soluta aspernatur consectetur neque molestias
                  nobis reiciendis cum. Qui tempore accusamus placeat laudantium
                  sed....
                </div>
              )}
              <CollapsibleContent className="space-y-2">
                <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
                  <PDFViewer pdfURL="https://www.abdullahibnshahin.com/detailedcv.pdf" />
                </div>
              </CollapsibleContent>
            </Collapsible>
            <div className="w-full flex justify-between items-center my-8">
              <h2 className="text-2xl font-bold">Assesstments</h2>
            </div>
            <div className="w-full flex flex-row  h-fit p-4 shadow-md rounded-md my-8">
              <div className="w-1/5 h-full flex flex-col ">
                <h3 className="text-2xl font-bold">Assesstment 1</h3>
                <span className="text-sm font-normal">
                  This is the first assesstment
                </span>
                <p className="text-sm font-normal">
                  Due Date : 12th August 2021
                </p>
              </div>
              <div className="w-4/5 h-full flex justify-end items-center">
                <Button variant="ghost">Edit</Button>
                <Button variant="ghost">Delete</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

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
              <Input id="name" placeholder="Title of your content" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="description">Content Description</Label>
              <Input id="description" placeholder="Description" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="category">Upload File</Label>
              <Input type="file" id="file" placeholder="Upload File" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setEditOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setEditOpen(false)}>Save</Button>
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
