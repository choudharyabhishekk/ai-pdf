"use client";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { Button } from "@/components/ui/button";
import { ShineBorder } from "@/components/ui/shine-border";

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
import { Features } from "@/components/ui/features";

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
          <Features />
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
            <div className="relative rounded-2xl border  p-6 border-gray-200  shadow-sm sm:order-last sm:px-8 lg:p-12">
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-tr from-red-400 to-pink-600 px-4 py-1 text-sm font-semibold text-white">
                Most Popular
              </span>
              <div className="text-center border-gray-200">
                <h2 className="text-lg font-medium text-gray-900 ">
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
                className="relative font-sans mt-8 rounded-full 
               bg-slate-100 border
               border-slate-200 px-8 py-3  font-medium text-sm transition-colors duration-300 ease-linear before:absolute before:right-1/2 before:top-1/2 before:-z-[1] before:h-3/4 before:w-2/3 before:origin-bottom-left before:-translate-y-1/2 before:translate-x-1/2 before:animate-ping before:rounded-full before:bg-red-500 hover:bg-red-500 hover:text-white hover:before:bg-pink-700"
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
                className="mt-8 font-sans block rounded-full border border-slate-200 bg-slate-100 px-12 py-3 text-center text-sm font-medium focus:ring-3 focus:outline-hidden"
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

      <section id="cta" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl overflow-hidden shadow-xl relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-52 h-52 bg-white/5 rounded-full -ml-16 -mb-16"></div>
            <div className="relative z-10 px-6 py-16 md:py-20 md:px-12 lg:py-24 lg:px-16 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-6 leading-tight">
                Ready to transform your
                <br className="hidden sm:block" /> note taking experience?
              </h2>

              <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                Join thousands of users who are already using AI PDF to
                <br className="hidden sm:block" />
                work smarter with their documents
              </p>

              <button
                className="bg-white  text-pink-600  px-6 py-2 rounded-full hover:bg-opacity-95 transition duration-300 font-medium text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                onClick={() => {
                  handleRoute("/sign-in");
                }}
              >
                Get Started Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
