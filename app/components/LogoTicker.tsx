"use client";

import React from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { Logos } from "../constants";
import Tag from "./Tag";

const LogoTicker = () => {
  return (
    <section className="py-24 overflow-hidden px-5">
      <div className="container mx-auto">
        <div className="flex justify-center whitespace-nowrap">
          <Tag>Stock Data Our Model Analyzes</Tag>
        </div>
        <div className="mt-12">
          <Marquee gradient={false} speed={50} autoFill direction="right">
            {Logos.map((logo, i) => (
              <div
                key={i}
                className="mx-8 h-[100px] w-[100px] flex items-center justify-center 
                      not-dark:bg-blue-500 rounded"
              >
                <Image
                  src={logo.image}
                  alt={logo.name}
                  width={80}
                  height={80}
                  quality={95}
                  className="object-contain max-h-full max-w-full"
                />
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
};

export default LogoTicker;
