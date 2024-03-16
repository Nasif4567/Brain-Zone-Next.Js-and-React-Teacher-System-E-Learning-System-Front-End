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
import { setUser } from "@/redux/authSlice";
import {useDispatch, useSelector} from "react-redux";
import { useEffect,useState } from "react";
import axios from 'axios';
import APIURL from "@/lib/variables";
import { useToast } from "@/components/ui/use-toast"
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export default function Page() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const url = APIURL;
  const {toast} = useToast();
  const router = useRouter();
 
  

  const register = async () => {
      if(password !== rePassword) {
          return alert("Passwords do not match")
      }
      if(!username || !email || !password) {
          return alert("Please fill in all fields")
      }
      
      try{
        setLoading(true)
      const res = await axios.post(`${url}/register`, {
          username,
          email,
          password,
          name
      })
      
      dispatch(setUser(res.data.user))
      setCookie("token", res.data.token, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
      
      setLoading(false)
      router.replace("/")
      
    } catch (error) {
        console.log(error)
        setLoading(false)
        setError(error)
        toast({
          title: "Error",
          description: error.response.data,
          variant: "destructive",
        })
    }

  }



  return (
    <div className="container flex h-screen ">
      <div className="m-auto w-1/2">
        <Lottie animationData={loginAnimation} />
      </div>
      <div className="m-auto w-1/2">
        <Card className="mx-auto h-full w-2/4 shadow-md">
          <CardHeader>
            <CardTitle>Teacher Register</CardTitle>
            <CardDescription>
              Enter your details to register
            </CardDescription>
          </CardHeader>
          <CardContent>
            
            <div className="flex flex-col space-y-4">
                <input
                  type="text"
                  placeholder="username"
                  className="rounded-lg border-2 border-gray-300 p-2"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}

                  required
                />
                <input 
                    type="text"
                    placeholder="name"
                    className="rounded-lg border-2 border-gray-300 p-2"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input 
                    type="email"
                    placeholder="email"
                    className="rounded-lg border-2 border-gray-300 p-2"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                  type="password"
                  placeholder="password"
                  className="rounded-lg border-2 border-gray-300 p-2"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <input 
                    type="password"
                    placeholder="confirm password"
                    className="rounded-lg border-2 border-gray-300 p-2"
                    value={rePassword}
                    onChange={(e) => setRePassword(e.target.value)}
                    required
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        register();
                      }
                    
                    }}
                />
                <button className={`rounded-lg bg-blue-500 p-2 text-white 
                ${loading && "bg-gray-500 animate-pulse text-gray-300 cursor-not-allowed"}
                `}
                disabled={loading}
                onClick={register}
                >
                  Register
                </button>
              </div>
          </CardContent>
          <CardFooter>
          
              <div className="flex justify-center">
                <p>
                  Have an account? <span 
                  className="text-blue-500 cursor-pointer"
                  onClick={() => router.replace("/login")}
                  >Login</span>
                </p>
              </div>
           
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
