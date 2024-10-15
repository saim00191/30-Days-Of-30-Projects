import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <header className="bg-white h-16 text-black shadow-lg flex items-center justify-center px-4 sm:px-6 md:px-8">
      <Link href="/" className="flex items-center justify-center mx-auto">
        <h1 className="font-bold text-xl sm:text-2xl text-center">
          30 Days Projects
        </h1>
      </Link>
    </header>
  );
}
