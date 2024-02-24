"use client";
import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
  
import ClipLoader from "react-spinners/ClipLoader";

export default function Page() {
  const [steps, setSteps] = useState(0);
  const incrementSteps = () => setSteps(steps + 1);
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
                {steps === 0 && "Fill in the details below to create a new course"}
                {steps === 1 && "Fill in the details below to create a new course"}
                {steps === 2 && "Creating your course"}
              
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              {steps === 0 && (
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Name of your project" />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" placeholder="Description" />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger id="framework">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="next">Next.js</SelectItem>
                        <SelectItem value="sveltekit">SvelteKit</SelectItem>
                        <SelectItem value="astro">Astro</SelectItem>
                        <SelectItem value="nuxt">Nuxt.js</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
              {steps === 1 && (
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Course Length</Label>
                    <Input id="name" placeholder="Length of your course" />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="description">Price</Label>
                    <Input id="description" placeholder="Price" />
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="category">Difficulty</Label>
                    <Select>
                      <SelectTrigger id="framework">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">
                          Intermediate
                        </SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>

                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="category">Language</Label>
                      <Select>
                        <SelectTrigger id="framework">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                          <SelectItem value="javascript">JavaScript</SelectItem>
                          <SelectItem value="typescript">TypeScript</SelectItem>
                          <SelectItem value="python">Python</SelectItem>
                          <SelectItem value="java">Java</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="category">Outcome</Label>
                      <Textarea id="description" placeholder="Outcome" />
                    </div>
                  </div>
                </div>
              )}
              {steps === 2 && (
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
            {steps === 0 && <Button onClick={incrementSteps}>Next</Button>}
            {steps === 1 && (
             <Button onClick={incrementSteps}>Create</Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
