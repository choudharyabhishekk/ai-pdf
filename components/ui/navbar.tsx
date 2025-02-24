import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 w-full rounded-xl mx-auto bg-white/80 backdrop-blur-sm z-50 border-b">
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
            <Link
              href="#features"
              className="text-gray-600 hover:text-gray-900"
            >
              Features
            </Link>
            <Link
              href="/#pricing"
              className="text-gray-600 hover:text-gray-900"
            >
              Pricing
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900">
              About
            </Link>
            {/* bg-gradient-to-br from-red-500 to-red-800 */}
            <Link
              className="bg-gradient-to-br from-red-500 to-red-800 text-white px-4 py-2 rounded-full"
              href="/sign-in"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
