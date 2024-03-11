"use client";
import React from "react";
import loginAnimation from "@/assets/animation-login.json";
import Lottie from "lottie-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function Page() {
  return (
    <div className="container flex h-screen ">
      <div className="m-auto w-1/2">
        <Lottie animationData={loginAnimation} />
      </div>
      <div className="m-auto w-1/2">
        <Card className="mx-auto h-full w-2/4 shadow-md">
          <CardHeader>
            <CardTitle>Teacher Login</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              <div className="flex flex-col space-y-4">
                <input
                  type="text"
                  placeholder="username"
                  className="rounded-lg border-2 border-gray-300 p-2"
                />
                <input
                  type="password"
                  placeholder="password"
                  className="rounded-lg border-2 border-gray-300 p-2"
                />
                <button className="rounded-lg bg-blue-500 p-2 text-white">
                  Login
                </button>
              </div>
            </CardDescription>
          </CardContent>
          <CardFooter>
            <CardDescription>
              <div className="flex justify-center">
                <p>
                  Don't have an account? <Link href="/register">Register</Link>
                </p>
              </div>
            </CardDescription>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
