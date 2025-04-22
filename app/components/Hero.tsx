"use client";

import React, { useEffect, useState } from "react";
import Button from "./Button";
import Image from "next/image";
import Pointer from "./Pointer";
import designExample1Image from "../assets/images/design-example-1.png";
import designExample2Image from "../assets/images/design-example-2.png";
import designExampleLight1Image from "../assets/images/design-example-light-1.png";
import designExampleLight2Image from "../assets/images/design-example-light-2.png";
import { motion, useAnimate } from "framer-motion";
import cursor from "../assets/images/cursor-you.svg";
import { ChevronDown } from "lucide-react";
import { CompanyNames } from "../constants";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";

const Hero = () => {
  const router = useRouter();
  const { isSignedIn } = useUser();
  const [headline, setHeadline] = useState("");
  const [leftDesignScope, leftDesignAnimate] = useAnimate();
  const [leftPointerScope, leftPointerAnimate] = useAnimate();
  const [rightDesignScope, rightDesignAnimate] = useAnimate();
  const [rightPointerScope, rightPointerAnimate] = useAnimate();
  const [selectedCompany, setSelectedCompany] = useState("AAPL");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!headline.trim() || !selectedCompany) return;

    if (!isSignedIn) {
      toast.error("Please sign in to use the feature!");
      return;
    }

    const query = new URLSearchParams({ headline }).toString();
    router.push(`/predictions/${selectedCompany}?${query}`);
  };

  useEffect(() => {
    if (
      leftDesignScope.current &&
      leftPointerScope.current &&
      rightDesignScope.current &&
      rightPointerScope.current
    ) {
      leftDesignAnimate([
        [leftDesignScope.current, { opacity: 1 }, { duration: 0.5 }],
        [leftDesignScope.current, { x: 0, y: 0 }, { duration: 0.5 }],
      ]);
      leftPointerAnimate([
        [leftPointerScope.current, { opacity: 1 }, { duration: 0.5 }],
        [leftPointerScope.current, { x: -100, y: 0 }, { duration: 0.5 }],
        [leftPointerScope.current, { x: 0, y: [0, 16, 0] }, { duration: 0.5 }],
      ]);

      rightDesignAnimate([
        [
          rightDesignScope.current,
          { opacity: 1 },
          { duration: 0.5, delay: 1.5 },
        ],
        [rightDesignScope.current, { x: 0, y: 0 }, { duration: 0.5 }],
      ]);
      rightPointerAnimate([
        [
          rightPointerScope.current,
          { opacity: 1 },
          { duration: 0.5, delay: 1.5 },
        ],
        [rightPointerScope.current, { x: 175, y: 0 }, { duration: 0.5 }],
        [rightPointerScope.current, { x: 0, y: [0, 16, 0] }, { duration: 0.5 }],
      ]);
    }
  }, [
    leftDesignAnimate,
    leftDesignScope,
    leftPointerAnimate,
    leftPointerScope,
    rightDesignAnimate,
    rightDesignScope,
    rightPointerAnimate,
    rightPointerScope,
  ]);

  return (
    <section className="sm:py-24 overflow-x-clip px-5">
      <div className="relative container mx-auto">
        <motion.div
          drag
          ref={leftDesignScope}
          initial={{ opacity: 0, y: 100, x: -100 }}
          className="absolute -left-10 top-16 hidden lg:block"
        >
          <div className="relative inline-block">
            <Image
              src={designExample1Image}
              alt="Design Example 1 Image"
              width={280}
              height={280}
              draggable="false"
              style={{
                cursor: `url(${cursor.src}),auto`,
              }}
              className="border border-gray-500 p-5 bg-black not-dark:hidden"
            />

            <Image
              src={designExampleLight1Image}
              alt="Design Example 1 Image"
              width={280}
              height={280}
              draggable="false"
              style={{
                cursor: `url(${cursor.src}),auto`,
              }}
              className="border border-gray-500 p-5 bg-gradient-to-r from-blue-200 to-blue-100 dark:hidden"
            />

            <div className="absolute -top-1 -left-1 w-2 h-2 bg-blue-500 dark:bg-white text-white font-bold"></div>

            <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 dark:bg-white text-white font-bold"></div>

            <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-blue-500 dark:bg-white text-white font-bold"></div>

            <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-blue-500 dark:bg-white text-white font-bold"></div>
          </div>
        </motion.div>
        <motion.div
          ref={leftPointerScope}
          initial={{ opacity: 0, y: 100, x: -200 }}
          className="absolute left-72 top-96 hidden lg:block"
        >
          <Pointer name="Andrea" />
        </motion.div>
        <motion.div
          drag
          ref={rightDesignScope}
          initial={{ opacity: 0, y: 100, x: 100 }}
          className="absolute -right-10 top-5 hidden lg:block"
        >
          <div className="relative inline-block">
            <Image
              src={designExample2Image}
              alt="Design Example 1 Image"
              width={280}
              height={280}
              draggable="false"
              style={{
                cursor: `url(${cursor.src}),auto`,
              }}
              className="border border-gray-500 p-5 bg-black not-dark:hidden"
            />

            <Image
              src={designExampleLight2Image}
              alt="Design Example 2 Image"
              width={280}
              height={280}
              draggable="false"
              style={{
                cursor: `url(${cursor.src}),auto`,
              }}
              className="border border-gray-500 p-5 bg-blue-100 dark:hidden"
            />

            <div className="absolute -top-1 -left-1 w-2 h-2 bg-blue-500 dark:bg-white text-white font-bold"></div>

            <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 dark:bg-white text-white font-bold"></div>

            <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-blue-500 dark:bg-white text-white font-bold"></div>

            <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-blue-500 dark:bg-white text-white font-bold"></div>
          </div>
        </motion.div>
        <motion.div
          ref={rightPointerScope}
          initial={{ opacity: 0, y: 100, x: 200 }}
          className="absolute right-80 top-10 hidden lg:block"
        >
          <Pointer name="Brian" color="red" />
        </motion.div>
        <h1 className="text-5xl md:text-7xl font-medium text-center mt-6 max-w-3xl mx-auto">
          Predict Stocks with News-Powered Insights
        </h1>

        <p className="text-center font-medium mt-8 text-xl dark:text-white/50 max-w-2xl mx-auto">
          Want to analyze your own news? Enter a headline and select a company
          to see its impact.
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex max-sm:flex-wrap justify-center items-center rounded-full p-2 mt-8 max-w-lg 
        mx-auto w-full gap-3 dark:shadow-md my-10"
        >
          <input
            type="text"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            placeholder="Enter news..."
            required
            className="bg-transparent px-4 flex-1 dark:text-white outline-none border dark:border-white/20 
            rounded-lg py-2 border-blue-400"
          />

          <div className="relative w-full lg:w-auto">
            <select
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              required
              className="appearance-none bg-transparent px-4 py-2 dark:text-white border dark:border-white/20 
              rounded-lg outline-none cursor-pointer w-full pr-10 not-dark:border-blue-400"
            >
              <option value="" disabled>
                Select Company
              </option>
              {CompanyNames.map((company) => (
                <option
                  key={company}
                  value={company}
                  className="bg-black text-white"
                >
                  {company}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="absolute top-1/2 right-3 transform -translate-y-1/2
           text-blue-400 dark:text-white pointer-events-none"
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="sm"
            className="whitespace-nowrap cursor-pointer px-5 py-2 not-dark:bg-blue-500 not-dark:text-white"
          >
            Analyze
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Hero;
