"use client";
import { Button } from "@/components/ui/button";
import React from "react";
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

export default function EditContentDialog(
  editOpen,
  setEditOpen,
  editContent,
  setEditContent,
  saveEdit
) {
  return (
    <Dialog open={editOpen} onOpenChange={setEditOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Course Content</DialogTitle>
          <DialogDescription>Edit your course content</DialogDescription>
        </DialogHeader>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Content Name</Label>
            <Input
              id="name"
              placeholder="Title of your content"
              value={editContent?.contentTitle}
              onChange={(e) =>
                setEditContent({ ...editContent, contentTitle: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="description">Content Description</Label>
            <Input
              id="description"
              placeholder="Description"
              value={editContent?.contentDescription}
              onChange={(e) =>
                setEditContent({
                  ...editContent,
                  contentDescription: e.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="category">Uploaded File</Label>
            <div className="flex items-center space-x-4">
              <p
                className={`text-sm font-semibold
                  hover:underline cursor-pointer text-blue-500 ${
                    editContent?.newFile && "line-through"
                  } ${editContent?.newFile && "text-red-500"}
                
                `}
              >
                {editContent?.contentURL?.split("/").pop()}
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  window.open(editContent?.contentURL, "_blank");
                }}
              >
                Open File
              </Button>
            </div>
            <Input
              type="file"
              id="file"
              placeholder="Replace File"
              onChange={(e) => {
                setEditContent({
                  ...editContent,
                  newFile: e.target.files[0],
                });
              }}
            />
            <div className="flex items-center space-x-4">
              <p
                className={`text-sm font-semibold `}
              >
                {editContent?.videoURL?.split("/").pop()}
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  window.open(editContent?.videoURL, "_blank");
                }}
              >
                Open File
              </Button>
            </div>
            <Input 
              type="file"
              id="video"
              placeholder="Replace Video"
              onChange={(e) => {
                setEditContent({
                  ...editContent,
                  newVideo: e.target.files[0],
                });
              }}
            />
            
          </div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setEditOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              saveEdit();
              setEditOpen(false);
            }}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
