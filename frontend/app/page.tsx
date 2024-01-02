import CustomLink from "@/components/common/CustomLink";
import HighlightedText from "@/components/common/HighlightedText";
import Navbar from "@/components/common/Navbar";
import { CodeSection } from "@/components/core/home/codeSection";
import ExploreSection from "@/components/core/home/exploreSection";
import HeroSection from "@/components/core/home/heroSection";
import React from "react";
import { FaArrowRight } from "react-icons/fa6";

export default function Home() {
  return (
    <div className="relative">
      <Navbar />
      <HeroSection />
      <CodeSection
        title={
          <p className="text-3xl capitalize font-bold">
            Unlock your <HighlightedText text="coding potential" /> with our
            online courses.
          </p>
        }
        description="Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
        codeColor="yellow"
        codeblock={`<<!DOCTYPE html>\n<html>\n<head><title>Example</title>\n</head>\n<body>\n<h1><ahref="/">Header</a>\n</h1>\n<nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n</nav>`}
        backgroudGradient="grad"
      />
      <CodeSection
        title={
          <p className="text-3xl capitalize font-bold">
            Unlock your <HighlightedText text="coding potential" /> with our
            online courses.
          </p>
        }
        description="Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
        codeColor="white"
        codeblock={`<<!DOCTYPE html>\n<html>\n<head><title>Example</title>\n</head>\n<body>\n<h1><ahref="/">Header</a>\n</h1>\n<nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n</nav>`}
        backgroudGradient="grad"
        reverse={true}
      />

      <ExploreSection />
      <div className="w-full md:-translate-y-32 bg-white bg-[url('/assets/Images/bghome.svg')] flex justify-center items-center gap-4 min-h[200px] md:min-h-[300px] ">
        <CustomLink LinkType="primary" link="/courses" className="rounded-md py-2 px-5 flex items-center gap-2 text-sm">
          Explore Courses <FaArrowRight />
        </CustomLink>
        <CustomLink link="/signup" className="rounded-md py-2 px-5 flex items-center gap-2 text-sm">
          Learn More
        </CustomLink>
      </div>
    </div>
  );
}
