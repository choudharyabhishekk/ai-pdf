"use client";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { Button } from "@/components/ui/button";
import Footer from "@/components/ui/footer";
import Navbar from "@/components/ui/navbar";

import {
  Brain,
  CheckIcon,
  ChevronRight,
  FileText,
  Github,
  ScanText,
  WandSparkles,
  XIcon,
  Zap,
} from "lucide-react";
import Image from "next/image";
import people from "./data/reviews";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  function handleRoute(route: string) {
    router.push(route);
  }

  return (
    <main className="max-w-6xl mx-auto p-8 ">
      {/* Hero Section */}
      <section id="hero" className="flex flex-col items-center space-y-3 mb-7">
        <h1 className="text-4xl lg:text-5xl font-medium ">
          Chat with any{" "}
          {/* <span className="bg-gradient-to-r from-red-400 to-pink-500 text-transparent bg-clip-text"> */}
          <span className=" bg-gradient-to-r from-red-500 to-pink-500 text-transparent bg-clip-text">
            PDF & take notes
          </span>
        </h1>
        <p className="text-lg text-gray-600">
          Extract insights, take notes, and understand complex documents with
          AI.
        </p>
        <div className="flex space-x-5 my-5">
          <Button
            variant={"default"}
            className="rounded-lg"
            onClick={() => handleRoute("/sign-in")}
          >
            Try for Free
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            variant={"secondary"}
            onClick={() => {
              window.open(
                "https://github.com/choudharyabhishekk/ai-pdf",
                "_blank"
              );
            }}
          >
            <Github className="mr-2 h-5 w-5" />
            Star on GitHub
          </Button>
        </div>
        <Image
          src="/hero.png"
          alt="Hero Image"
          width={1000}
          height={600}
          className="mx-auto rounded-lg border "
        />

        <p className="text-lg text-gray-600 text-center my-10">
          Trusted by students and researchers from top institutions
        </p>
        <div className="flex flex-row items-center justify-center w-full ">
          <AnimatedTooltip items={people} />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-4xl lg:text-5xl font-medium mb-4">
              Powerful Features
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to analyze and understand your PDF documents
              more effectively
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white border border-gray-100 p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow cursor-pointer">
              <div className="bg-indigo-50 w-12 h-12 flex items-center justify-center rounded-lg mb-4">
                <FileText className="h-6 w-6 text-indigo-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Smart PDF Processing
              </h3>
              <p className="text-gray-600">
                Upload any PDF and our AI will analyze its content, making it
                ready for interactive conversations.
              </p>
            </div>
            <div className="bg-white  border border-gray-100 p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow cursor-pointer">
              <div className="bg-sky-50 w-12 h-12 flex items-center justify-center rounded-lg mb-4">
                <WandSparkles className="h-6 w-6 text-sky-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI-Powered Chat</h3>
              <p className="text-gray-600">
                Ask questions about your documents and get instant, accurate
                responses based on the content.
              </p>
            </div>
            <div className="bg-white  border border-gray-100 p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow cursor-pointer">
              <div className="bg-indigo-50 w-12 h-12 flex items-center justify-center rounded-lg mb-4">
                <ScanText className="h-6 w-6 text-indigo-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Notes</h3>
              <p className="text-gray-600">
                Create and organize notes with AI-suggested summaries and key
                points from your documents.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}

      <section id="pricing" className="py-10 bg-blue/100 backdrop-blur-sm">
        <h2 className="text-4xl lg:text-5xl font-medium mb-4 text-center">
          Pricing
        </h2>
        <p className="text-center mt-2 text-lg text-gray-600">
          Choose the perfect plan for your document management needs
        </p>
        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-center md:gap-8">
            <div className="rounded-2xl border border-indigo-600 p-6 ring-1 shadow-xs ring-indigo-600 sm:order-last sm:px-8 lg:p-12">
              <div className="text-center">
                <h2 className="text-lg font-medium text-gray-900">
                  Pro
                  <span className="sr-only">Plan</span>
                </h2>

                <p className="mt-2 sm:mt-4">
                  <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">
                    {" "}
                    $10{" "}
                  </strong>

                  <span className="text-sm font-medium text-gray-700">
                    /month
                  </span>
                </p>
              </div>
              <ul className="mt-6 space-y-2">
                <li className="flex items-center gap-1">
                  <CheckIcon className="text-green-500" size={20} />

                  <span className="text-gray-700">
                    {" "}
                    Unlimited file uploads{" "}
                  </span>
                </li>

                <li className="flex items-center gap-1">
                  <CheckIcon className="text-green-500" size={20} />

                  <span className="text-gray-700"> Unlimited notes </span>
                </li>

                <li className="flex items-center gap-1">
                  <CheckIcon className="text-green-500" size={20} />

                  <span className="text-gray-700"> Email support </span>
                </li>

                <li className="flex items-center gap-1">
                  <CheckIcon className="text-green-500" size={20} />

                  <span className="text-gray-700"> Help center access </span>
                </li>
              </ul>

              <button
                className="mt-8 block rounded-full border border-indigo-600 bg-indigo-600 px-12 py-3 text-center text-sm font-medium text-white hover:bg-indigo-700 hover:ring-1 hover:ring-indigo-700 focus:ring-3 focus:outline-hidden"
                onClick={() => {
                  handleRoute("/dashboard/upgrade");
                }}
              >
                Upgrade Now
              </button>
            </div>

            <div className="rounded-2xl border border-gray-200 p-6 shadow-xs sm:px-8 lg:p-12">
              <div className="text-center">
                <h2 className="text-lg font-medium text-gray-900">
                  Free
                  <span className="sr-only">Plan</span>
                </h2>

                <p className="mt-2 sm:mt-4">
                  <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">
                    {" "}
                    $0{" "}
                  </strong>

                  <span className="text-sm font-medium text-gray-700">
                    /month
                  </span>
                </p>
              </div>

              <ul className="mt-6 space-y-2">
                <li className="flex items-center gap-1">
                  <CheckIcon className="text-green-500" size={20} />

                  <span className="text-gray-700"> 2 Files Limit </span>
                </li>

                <li className="flex items-center gap-1">
                  <XIcon className="text-red-500" size={20} />

                  <span className="text-gray-700"> Unlimited Notes </span>
                </li>

                <li className="flex items-center gap-1">
                  <XIcon className="text-red-500" size={20} />

                  <span className="text-gray-700"> Email support </span>
                </li>

                <li className="flex items-center gap-1">
                  <XIcon className="text-red-500" size={20} />

                  <span className="text-gray-700"> Help center access </span>
                </li>
              </ul>

              <button
                className="mt-8 block rounded-full border border-slate-200 bg-slate-100 px-12 py-3 text-center text-sm font-medium focus:ring-3 focus:outline-hidden"
                onClick={() => {
                  handleRoute("/dashboard/upgrade");
                }}
              >
                Try for Free
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="py-10">
        <div className="max-w-7xl mx-auto bg-gradient-to-tl from-blue-400 via-indigo-500 to-[#7e70fd] rounded-2xl ">
          <div className="rounded-2xl p-12 lg:py-24  text-center  text-white shadow-md ">
            <h2 className="text-4xl tracking-tight lg:text-5xl font-medium mb-6 leading-normal">
              Ready to transform your <br /> note taking experience?
            </h2>
            <p className="text-base lg:text-xl mb-8 opacity-90">
              Join thousands of users who are already using AI PDF to <br />
              work smarter with their documents
            </p>
            <button
              className="bg-white text-indigo-500 px-8 py-3 rounded-lg hover:bg-indigo-50 transition font-semibold"
              onClick={() => {
                handleRoute("/sign-in");
              }}
            >
              Get Started Now
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
