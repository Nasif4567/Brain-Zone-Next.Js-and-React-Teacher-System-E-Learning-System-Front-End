'use client'
import React from 'react'
import loginAnimation from '@/assets/animation-login.json'
import Lottie from "lottie-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  
export default function Page() {
  return (
    <div className="container h-screen flex ">
        <div className="m-auto w-1/2">
            <Lottie animationData={loginAnimation} />
        </div>
        <div className="m-auto w-1/2">
            <Card className="h-full w-2/4 mx-auto shadow-md">
                <CardHeader>
                    <CardTitle>Teacher Login</CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription>
                        <div className="flex flex-col space-y-4">
                            <input type="text" placeholder="username" className="p-2 border-2 border-gray-300 rounded-lg" />
                            <input type="password" placeholder="password" className="p-2 border-2 border-gray-300 rounded-lg" />
                            <button className="bg-blue-500 text-white p-2 rounded-lg">Login</button>
                        </div>
                    </CardDescription>
                </CardContent>
                <CardFooter>
                    <CardDescription>
                        <div className="flex justify-center">
                            <p>Don't have an account? <a href="/register">Register</a></p>
                        </div>
                    </CardDescription>
                </CardFooter>
            </Card>
            </div>



    </div>
  )
}
