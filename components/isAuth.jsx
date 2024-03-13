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
        console.log(err);
        if (err?.response?.message === "Token expired") {
          return "not-verified";
        }
        if(err?.response?.message === "Token not provided"){
          return "not-verified"
        }

        return false;
      }
    } else {
      return true;
    }
  };

  useLayoutEffect(() => {
    isAuthenicated().then((res) => {
      if (res === "not-verified" && pathName !== "/login" && pathName !== "/register") {
        toast.toast({
          title: "Error",
          description: "Please Login to continue",
        });
        router.replace("/login");
      }
      if (res === true && pathName === "/login") {
        router.replace("/");
      }
      if (res === true && pathName === "/register") {
        router.replace("/");
      }
      if (!res && pathName !== "/login" && pathName !== "/register") {
        toast.toast({
          title: "Error",
          description: "Please login to continue",
          variant: "destructive",
        });
        router.replace("/login");
      }
      
    });
  }, []);

  return <>{children}</>;
}

export default IsAuth;
