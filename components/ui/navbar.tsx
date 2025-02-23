"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function Navbar() {
  const router = useRouter();
  return (
    <nav className="fixed w-full rounded-xl mx-auto bg-white/80 backdrop-blur-sm z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/">
              <Image
                title="View Dashboard"
                src="/logo.png"
                width={100}
                height={100}
                alt="profile"
                className="mx-auto cursor-pointer"
              />
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#features" className="text-gray-600 hover:text-gray-900">
              Features
            </a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900">
              Pricing
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              About
            </a>
            <button
              className="bg-gradient-to-br from-red-500 to-red-800 text-white px-4 py-2 rounded-full"
              onClick={() => router.push("/sign-in")}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
