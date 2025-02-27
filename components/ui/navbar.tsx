import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/#features"
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
            <Link
              className="bg-gradient-to-br from-red-500 to-red-800 text-white px-4 py-2 rounded-full"
              href="/sign-in"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600  hover:text-gray-900"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="flex flex-col items-center px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                href="#features"
                className="block text-gray-600 hover:text-gray-900 py-2"
              >
                Features
              </Link>
              <Link
                href="/#pricing"
                className="block text-gray-600 hover:text-gray-900 py-2"
              >
                Pricing
              </Link>
              <Link
                href="/about"
                className="block text-gray-600 hover:text-gray-900 py-2"
              >
                About
              </Link>
              <Link
                className=" bg-gradient-to-br from-red-500 to-red-800 text-white px-4 py-2 rounded-full w-full text-center"
                href="/sign-in"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
