"use client";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { Button } from "@/components/ui/button";
import Footer from "@/components/ui/footer";
import Navbar from "@/components/ui/navbar";
import { api } from "@/convex/_generated/api";
import { UserButton, useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { Brain, ChevronRight, FileText, Github, Zap } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
import people from "./data/reviews";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user, isLoaded } = useUser(); // Add isLoaded to check if user data is fully loaded
  const createUser = useMutation(api.user.createUser);
  const router = useRouter()

  // check if user exists
  // const checkUser = async (): Promise<void> => {
  //   if (!isLoaded) {
  //     console.log("User data is still loading...");
  //     return;
  //   }

  //   if (
  //     user?.primaryEmailAddress?.emailAddress &&
  //     user?.imageUrl &&
  //     user?.fullName
  //   ) {
  //     await createUser({
  //       email: user.primaryEmailAddress.emailAddress,
  //       imageUrl: user.imageUrl,
  //       userName: user.fullName,
  //     });
  //   } else {
  //     console.error("User information is incomplete.", user);
  //   }
  // };

  // useEffect(() => {
  //   checkUser();
  // }, [user, isLoaded]);

  return (
    <>
    <Navbar/>
    <main className="max-w-6xl mx-auto p-8 pt-32">
      {/* Hero Section */}
      <section className="flex flex-col items-center space-y-4 ">
      <h1 className="text-4xl lg:text-5xl font-medium">Chat with any {" "}
        <span className="">
        PDF & take notes 
        </span></h1>
      <p className="text-base text-gray-600">Extract insights, take notes, and understand complex documents with AI.</p>
       <div className="flex space-x-5 my-5">
                <Button variant={"default"} className="rounded-lg" onClick={(e)=> {
                  e.preventDefault();
                   router.push("/sign-up");
                }} >
                  Try for Free
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant={"secondary"} onClick={(e)=> {
                  e.preventDefault();
                  window.open("https://github.com/choudharyabhishekk/ai-pdf", "_blank"); 
                }}>
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
      
      <p className="text-base text-gray-600 text-center my-10">Trusted by students and researchers from top institutions</p>
       <div className="flex flex-row items-center justify-center mb-7 w-full">
      <AnimatedTooltip items={people} /></div>

    </section>
    


      {/* Features Section */}
      <section className="feature py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-4xl lg:text-5xl font-medium mb-4">Powerful Features</h2>
            <p className="text-gray-600">
              Everything you need to analyze and understand your PDF documents more effectively
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white border border-gray-100 p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
              <div className="bg-indigo-50 w-12 h-12 flex items-center justify-center rounded-lg mb-4">
                <FileText className="h-6 w-6 text-indigo-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart PDF Processing</h3>
              <p className="text-gray-600">
                Upload any PDF and our AI will analyze its content, making it ready for interactive conversations.
              </p>
            </div>
            <div className="bg-white  border border-gray-100 p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
              <div className="bg-sky-50 w-12 h-12 flex items-center justify-center rounded-lg mb-4">
                <Brain className="h-6 w-6 text-sky-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI-Powered Chat</h3>
              <p className="text-gray-600">
                Ask questions about your documents and get instant, accurate responses based on the content.
              </p>
            </div>
            <div className="bg-white  border border-gray-100 p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
              <div className="bg-indigo-50 w-12 h-12 flex items-center justify-center rounded-lg mb-4">
                <Zap className="h-6 w-6 text-indigo-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Notes</h3>
              <p className="text-gray-600">
                Create and organize notes with AI-suggested summaries and key points from your documents.
              </p>
            </div>
          </div>
        </div>   
      </section>
  
      {/* CTA Section */}
      <section className="mb-10">
        <div className="max-w-7xl mx-auto  sm:px-6 lg:px-8">
          <div className="bg-gradient-to-bl from-indigo-500 to-sky-500 rounded-2xl p-12 lg:py-20 text-center text-white backdrop-blur-sm">
            <h2 className="text-4xl tracking-tight lg:text-5xl font-medium mb-4 leading-snug">Ready to transform your  <br/> PDF experience?</h2>
            <p className="text-base lg:text-xl mb-8 opacity-90">
              Join thousands of users who are already using AI PDF<br/> to work smarter  with their documents.
            </p>
            <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg hover:bg-indigo-50 transition font-semibold">
              Get Started Now
            </button>
          </div>
        </div>
      </section>


    </main>
    <Footer/>
    </>
  );
}
