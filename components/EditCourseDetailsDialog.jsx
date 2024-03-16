"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Select from "react-select";
export default function EditCourseDetailsDialog({ course, open, setOpen }) {
  const [title, setTitle] = useState(course.courseName);
  const [description, setDescription] = useState(course.courseDescription);
  const [image, setImage] = useState(course.courseImage);
  const [price, setPrice] = useState(course.coursePrice);
  const [difficulty, setDifficulty] = useState(course.courseDifficulty);
  const [language, setLanguage] = useState(course.courseLanguage);
  const [duration, setDuration] = useState(course.courseDuration);

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

  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Course Details</DialogTitle>
            <DialogDescription>
              Change the details of the course below
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col space-y-4">
            <Input
              label="Course Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Input
              label="Course Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <Input
              label="Course Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <Select
              options={difficulties}
              value={difficulty}
              onChange={setDifficulty}
              defaultValue={difficulties.filter(
                (diff) => diff.value === course.courseDifficulty
              )}
              placeholder="Select Difficulty"
            />
            <Select
              options={languages}
              value={language}
              onChange={setLanguage}
              defaultValue={languages.filter(
                (lang) => lang.value === course.courseLanguage
              )}
              placeholder="Select Language"
            />

            <Button variant="outline">Save</Button>
            <Button variant="destructive" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
