import Image from 'next/image'
import React from 'react'

export default function Footer() {
  return (     <footer className="bg-white/50 backdrop-blur-sm border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center">
                <span className="text-xl font-bold"> <Image
                                                 title="View Dashboard"
                                                 src="/logo.png"
                                                 width={100}
                                                 height={100}
                                                 alt="profile"
                                                 className="mx-auto"
                                               /></span>
              </div>
              <p className="mt-4 text-gray-600">
                Making document analysis <br/> smarter with AI.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#features" className="hover:text-gray-900">Features</a></li>
                <li><a href="#pricing" className="hover:text-gray-900">Pricing</a></li>
                <li><a href="/sign-in" className="hover:text-gray-900">Get started</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-gray-900">About</a></li>
                <li><a href="#" className="hover:text-gray-900">Blog</a></li>
                <li><a href="#" className="hover:text-gray-900">Careers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Privacy</a></li>
                <li><a href="#" className="hover:text-gray-900">Terms</a></li>
                <li><a href="#" className="hover:text-gray-900">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-gray-600">
            <p>© 2024 AI PDF. All rights reserved. Created by {" "}
                <a href="https://abhix.io" target='_blank' className="text-blue-500 hover:text-blue-700">
                Abhishek Choudhary </a>
                </p>
          </div>
        </div>
</footer>  )
}
