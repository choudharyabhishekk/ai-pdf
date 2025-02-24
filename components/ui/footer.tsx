import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white/50 backdrop-blur-sm border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center">
              <span className="text-xl font-bold">
                <Image
                  title="View Dashboard"
                  src="/logo.png"
                  width={100}
                  height={100}
                  alt="profile"
                  className="mx-auto"
                />
              </span>
            </div>
            <p className="mt-4 text-gray-600">
              Making document analysis <br /> smarter with AI.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <Link href="/#features" className="hover:text-gray-900">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="hover:text-gray-900">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/sign-in" className="hover:text-gray-900">
                  Get started
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <Link href="/about" className="hover:text-gray-900">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/policy" className="hover:text-gray-900">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <Link href="/" className="hover:text-gray-900">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-gray-900">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/sign-up" className="hover:text-gray-900">
                  Sign up
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-gray-600">
          <p>
            © 2024 AI PDF. All rights reserved. Created by{" "}
            <Link
              href="https://abhix.io"
              target="_blank"
              className="text-blue-500 hover:text-blue-700"
            >
              Abhishek Choudhary{" "}
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
