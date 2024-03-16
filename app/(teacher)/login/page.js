"use client";
import React, { useState } from "react";
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
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "@/redux/authSlice";
import { useRouter } from "next/navigation";
import APIURL from "@/lib/variables";
import { useToast } from "@/components/ui/use-toast";
import { setCookie } from "cookies-next";

export default function Page() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const router = useRouter();
  const { toast } = useToast();

  const user = useSelector((state) => state.auth.user);
  if (user) {
    router.replace("/");
  }

  const handleLogin = async () => {
    if (username === "" || password === "") {
      toast({
        title: "Error",
        description: "Please fill in all the fields",
      });
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(`${APIURL}/login`, {
        username,
        password,
      });
      dispatch(setUser(res.data.user));
      
      setCookie("token", res.data.token, {
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });
      setLoading(false);
      router.replace("/");
      toast({
        title: "Success",
        description: res.data.message,
      });
    } catch (e) {
      console.log(e);
      setLoading(false);
      toast({
        title: "Error",
        description: e.response.data,
        variant :"destructive"
      });
    }
  };

  return (
    <div className="container flex h-screen ">
      <div className="m-auto w-1/2">
        <Lottie animationData={loginAnimation} />
      </div>
      <div className="m-auto w-1/2 flex items-center ">
        <Card className="w-1/2 mx-auto">
          <CardHeader>
            <CardTitle>Login to the Teacher Portal</CardTitle>
            <CardDescription>
              Enter your username and password to login
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-2">
              <input
                type="text"
                placeholder="Username"
                className="p-2 rounded-md border"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="p-2 rounded-md border"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className={`bg-blue-500 text-white p-2 rounded-md
                ${loading && "bg-gray-500"}
                `}
                onClick={handleLogin}
                disabled={loading}

              >
                Login
              </button>
             
            </div>


          </CardContent>
          <CardFooter>
            <p>
              Don't have an account?{" "}
              
              <span className="text-blue-500 cursor-pointer"
              onClick={() => router.replace("/register")}
              >
                Register
              </span>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
