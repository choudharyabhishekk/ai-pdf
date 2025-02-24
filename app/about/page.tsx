"use client";

import React from "react";
import { Zap, Shield, Lightbulb } from "lucide-react";
import Link from "next/link";

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-[#0F172A] text-center mb-6">
            About{" "}
            <span className="bg-gradient-to-r  from-red-500 to-pink-500  text-transparent bg-clip-text">
              AI PDF Notes
            </span>
          </h1>
          <p className="text-xl text-gray-600 text-center max-w-2xl mx-auto">
            Transforming how people interact with and understand PDF documents
            through the power of artificial intelligence.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-[#0F172A] mb-4">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600">
              We believe that knowledge should be accessible and easy to
              understand. Our platform combines cutting-edge AI technology with
              intuitive design to help students and researchers extract
              meaningful insights from their documents.
            </p>
            <p className="text-lg text-gray-600">
              Whether you're analyzing research papers, studying complex
              materials, or organizing your notes, we're here to make your
              workflow more efficient and effective.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#0F172A] text-center mb-12">
            Our Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-[#0F172A]">
                Innovation
              </h3>
              <p className="text-gray-600">
                We continuously push the boundaries of what's possible with AI
                and document processing technology.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-[#0F172A]">Security</h3>
              <p className="text-gray-600">
                Your documents and data privacy are our top priority, with
                enterprise-grade security measures.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
                <Lightbulb className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-[#0F172A]">
                Simplicity
              </h3>
              <p className="text-gray-600">
                We believe in making complex tasks simple through intuitive
                design and smart automation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-[#0F172A] mb-6">
            Ready to transform your document workflow?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Start extracting insights from your PDFs today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors"
              href="/sign-up"
            >
              Try for Free
            </Link>
            <button
              onClick={() => {
                window.open(
                  "https://github.com/choudharyabhishekk/ai-pdf",
                  "_blank"
                );
              }}
              className="px-6 py-3 bg-gray-100 text-gray-600 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
            >
              Star on GitHub
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
