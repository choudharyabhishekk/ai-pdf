"use client";

import {
  FileText,
  WandSparkles,
  ScanText,
  Search,
  ShieldCheck,
} from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";

export function Features() {
  return (
    <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
      <GridItem
        area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
        icon={
          <FileText className="h-6 w-6 text-indigo-400 dark:text-neutral-400" />
        }
        color="from-indigo-50"
        title="Smart PDF Processing"
        description="Upload any PDF and our AI will analyze its content, making it ready for interactive conversations."
      />

      <GridItem
        area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
        icon={
          <ScanText className="h-6 w-6 text-gray-600 dark:text-neutral-400" />
        }
        title="Smart Notes"
        color="from-yellow-50"
        description="Create and organize notes with AI-suggested summaries and key points from your documents."
      />

      <GridItem
        area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
        icon={
          <WandSparkles className="h-6 w-6 text-rose-400 dark:text-neutral-400" />
        }
        color="from-rose-100"
        title="AI-Powered Chat"
        description="Ask questions about your documents and get instant, accurate responses based on the content."
      />

      <GridItem
        area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
        icon={
          <Search className="h-6 w-6 text-blue-500 dark:text-neutral-400" />
        }
        color="from-sky-100"
        title="Advanced Search"
        description="Find exactly what you're looking for with AI-powered search capabilities."
      />

      <GridItem
        area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
        icon={
          <ShieldCheck className="h-6 w-6 text-slate-700 dark:text-neutral-400" />
        }
        color="from-green-100"
        title="Secure & Private"
        description="Your documents are analyzed with top-tier security, ensuring privacy and data protection."
      />
    </ul>
  );
}

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  color: string;
  description: React.ReactNode;
}

const GridItem = ({ area, color, icon, title, description }: GridItemProps) => {
  return (
    <li className={`min-h-[14rem] list-none ${area}`}>
      <div className="relative h-full rounded-2.5xl border p-2 md:rounded-3xl md:p-3 cursor-pointer">
        <GlowingEffect
          blur={0}
          borderWidth={2}
          spread={60}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-0.75 p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D] md:p-6">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div
              className={`bg-gradient-to-tr ${color} to-gray-100 w-fit rounded-lg p-3`}
            >
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className="pt-0.5 text-xl/[1.375rem] font-semibold  -tracking-4  text-balance text-black dark:text-white">
                {title}
              </h3>
              <h2 className="[&_b]:md:font-semibold [&_strong]:md:font-semibold  text-sm/[1.125rem] md:text-base/[1.375rem] text-gray-600 dark:text-neutral-400">
                {description}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
