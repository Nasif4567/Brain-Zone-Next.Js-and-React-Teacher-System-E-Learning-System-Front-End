// isAuth.js
"use client";
import React, { useEffect, useLayoutEffect } from "react";
import {useSelector, useDispatch} from "react-redux";
import { setUser } from "@/redux/authSlice";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { usePathname } from "next/navigation";
import APIURL from "@/lib/variables";

function IsAuth({ children }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const toast = useToast();
  const pathName = usePathname();
  const user = useSelector((state) => state.auth.user);



  const isAuthenicated = async () => {
    if (!user) {
      try {
        const res = await axios.get(`${APIURL}/getUser`, {
          withCredentials: true,
        });
        console.log(res.data);
        dispatch(setUser(res.data));
        return true;
      } catch (err) {
        if (err?.message === "Token expired") {
          return "not-verified";
        }

        return false;
      }
    } else {
      return true;
    }
  };

  useLayoutEffect(() => {
    isAuthenicated().then((res) => {
      if (res === "not-verified") {
        toast.toast({
          title: "Error",
          description: "Please Login to continue",
        });
        router.push("/login");
      }
      if (!res) {
        toast.toast({
          title: "Error",
          description: "Please login to continue",
          variant: "destructive",
        });
        router.push("/login");
      }
      if (res === true && pathName === "/login") {
        router.push("/");
      }
      if (res === true && pathName === "/register") {
        router.push("/");
      }
    });
  }, []);

  return <>{children}</>;
}

export default IsAuth;
