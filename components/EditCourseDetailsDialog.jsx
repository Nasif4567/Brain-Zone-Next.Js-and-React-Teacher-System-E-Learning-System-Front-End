"use client";
import React,{useState} from "react";
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
import Select from 'react-select'
export default function EditCourseDetailsDialog({ course, open, setOpen }) {
    const difficultyOptions = [
        { value: 'Beginner', label: 'Beginner' },
        { value: 'Intermediate', label: 'Intermediate' },
        { value: 'Advanced', label: 'Advanced' }
      ]
        const languageOptions = [
            { value: 'Javascript', label: 'Javascript' },
            { value: 'Python', label: 'Python' },
            { value: 'Java', label: 'Java' }
        ]
        const [selectedDifficulty, setSelectedDifficulty] = useState(
            difficultyOptions.find(option => option.value === course.difficulty)
        )
        const [selectedLanguage, setSelectedLanguage] = useState(
            languageOptions.find(option => option.value === course.language)
        )

        const handleDifficultyChange = (selectedDifficulty) => {
            setSelectedDifficulty(selectedDifficulty)
        }
        const handleLanguageChange = (selectedLanguage) => {
            setSelectedLanguage(selectedLanguage)
        }




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
            <Input label="Course Title" value={course.title} />
            <Input label="Course Description" value={course.description} />
            <Input label="Course Image" value={course.image} />
            <Input label="Course Price" value={course.price} />

            <Select 
            options={difficultyOptions}
            value={selectedDifficulty}
            onChange={handleDifficultyChange}
            placeholder='Select Difficulty'
            />
            <Select
            options={languageOptions}
            value={selectedLanguage}
            onChange={handleLanguageChange}
            placeholder='Select Language'
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
