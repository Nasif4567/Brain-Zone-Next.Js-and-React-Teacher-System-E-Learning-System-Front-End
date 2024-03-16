import React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export default function FloatingButton() {
  return (
    <div className="fixed bottom-10 right-30">
      <DropdownMenu>
        <DropdownMenuTrigger className="bg-blue-500 text-white w-14 h-14 text-3xl rounded-full">
          +
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <Link href="/create-course">
            <DropdownMenuItem>Create Course</DropdownMenuItem>
          </Link>
          <DropdownMenuItem>Create Assestment</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
