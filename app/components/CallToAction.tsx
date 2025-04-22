"use client";

import React from "react";
import Marquee from "react-fast-marquee";

const CallToAction = () => {
  return (
    <section className="py-24 overflow-hidden relative px-5">
      <div className="w-full flex">
        <Marquee
          speed={300}
          gradient={false}
          pauseOnHover
          autoFill
          className="group overflow-hidden cursor-pointer"
        >
          <div className="flex items-center gap-8 mx-8">
            <span className="text-blue-500 dark:text-lime-400 text-7xl">
              &#10038;
            </span>
            <span
              className="text-6xl md:text-7xl font-medium dark:group-hover:text-lime-400 
            group-hover:text-blue-400"
            >
              Try it for free
            </span>
          </div>
        </Marquee>
      </div>
    </section>
  );
};

export default CallToAction;
