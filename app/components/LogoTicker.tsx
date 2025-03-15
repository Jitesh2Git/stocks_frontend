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
              <div key={i} className="mx-8">
                <Image
                  src={logo.image}
                  alt={logo.name}
                  width={100}
                  height={100}
                  quality={95}
                  className="object-contain"
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
