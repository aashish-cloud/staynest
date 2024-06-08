"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Send } from "lucide-react";

const Logo = () => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push("/")}
      className="flex-row items-center justify-center hidden md:flex cursor-pointer gap-2"
    >
      <Send className="text-rose-500"/>
      <h1 className="text-xl text-rose-500 font-bold">StayNest</h1>
    </div>
  );
};

export default Logo;
