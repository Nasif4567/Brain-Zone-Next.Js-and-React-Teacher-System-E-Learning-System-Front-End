"use client";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/redux/authSlice";
import { deleteCookie } from "cookies-next";
import LogoutDialog from "./LogoutDialog";
import { useRouter } from "next/navigation";
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const handleLogout = () => {
    deleteCookie("token");
    dispatch(logout());
    router.replace("/login");
  };
  return (
    <>
      <nav className="flex m-2 p-10 justify-between items-center">
        {/* Navbar content goes here */}
        <Link href={"/"}>
          <h2 className="text-2xl font-sans font-semibold">Teacher</h2>
        </Link>
        <ul className="flex space-x-4">
          <Link href={"/course"}>
            <li>Courses</li>
          </Link>
          <li>Students</li>
        </ul>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>
                User
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>
              Welcome {user?.name?.split(" ")[0]}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Courses</DropdownMenuItem>
            <DropdownMenuItem>Students</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                setOpen(true);
              }}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
      <LogoutDialog
        open={open}
        setOpen={setOpen}
        logoutFunction={handleLogout}
      />
    </>
  );
};

export default Navbar;
