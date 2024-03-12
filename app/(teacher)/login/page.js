"use client";
import React,{useState} from "react";
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
import {useSelector, useDispatch} from "react-redux";
import {setUser} from "@/redux/authSlice";
import {useRouter} from "next/navigation";
import APIURL from "@/lib/variables";
import { useToast } from "@/components/ui/use-toast"
import { setCookie } from 'cookies-next';



export default function Page() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();
  const {toast} = useToast();


  const user = useSelector((state) => state.auth.user);
  if (user) {
    router.push("/");
  }

  const handleLogin = async () => {
    if(username === "" || password === ""){
      toast({
        title: "Error",
        description : "Please fill in all the fields",
      })
      return;
    }
    try{

      const res = await axios.post(`${APIURL}/login`,{
        username,
        password
      });
      dispatch(setUser(res.data.user));
      console.log(res)
      setCookie("token", res.data.token, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
      router.push("/");


    }catch(e){
      console.log(e);
      toast({
        title: "Error",
        description : e.response.data,
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
            <CardTitle>Teacher Login</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              <div className="flex flex-col space-y-4">
                <input
                  type="text"
                  placeholder="username"
                  className="rounded-lg border-2 border-gray-300 p-2"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="password"
                  className="rounded-lg border-2 border-gray-300 p-2"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button className="rounded-lg bg-blue-500 p-2 text-white"
                  onClick={handleLogin}
                >
                  Login
                </button>
              </div>
            </CardDescription>
          </CardContent>
          <CardFooter>
            <CardDescription>
              <div className="flex justify-center">
                <div>
                  Don't have an account? <Link href="/register">Register</Link>
                </div>
              </div>
            </CardDescription>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
