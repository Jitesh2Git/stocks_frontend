"use client";

import Image from "next/image";
import React, { useState } from "react";
import Button from "./Button";
import Link from "next/link";
import logo from "../assets/images/logo.png";
import { NavLinks } from "../constants";
import { twMerge } from "tailwind-merge";
import { AnimatePresence, motion } from "framer-motion";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { ChartCandlestick } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="fixed w-full top-0 flex items-center justify-center py-4 lg:py-8 px-5 z-50">
        <div className="container max-w-5xl">
          <div
            className="dark:border dark:border-white/15 rounded-[27px] md:rounded-full dark:bg-neutral-950/70 
          backdrop-blur bg-white/50"
          >
            <div className="grid grid-cols-2 md:grid-cols-3 p-2 px-4 md:pr-2 items-center">
              <Link href="/" className="not-dark:hidden">
                <Image src={logo} alt="Logo" width={180} height={180} />
              </Link>
              <Link href="/" className="dark:hidden flex items-center gap-2">
                <ChartCandlestick className="text-blue-500 size-6 sm:size-8 shrink-0" />
                <span className="text-xl sm:text-2xl font-medium text-black/80">
                  SoftStock
                </span>
              </Link>
              <div className="hidden md:flex justify-center items-center">
                <nav className="flex gap-6 font-medium">
                  {NavLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="hover:text-blue-500 not-dark:text-black/80 
                      dark:hover:text-lime-400 transition"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
              <div className="flex justify-end gap-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-menu md:hidden"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <line
                    x1="3"
                    y1="6"
                    x2="21"
                    y2="6"
                    className={twMerge(
                      "origin-left transition",
                      isOpen && "rotate-45 -translate-y-1"
                    )}
                  ></line>
                  <line
                    x1="3"
                    y1="12"
                    x2="21"
                    y2="12"
                    className={twMerge("transition", isOpen && "opacity-0")}
                  ></line>
                  <line
                    x1="3"
                    y1="18"
                    x2="21"
                    y2="18"
                    className={twMerge(
                      "origin-left transition",
                      isOpen && "-rotate-45 translate-y-1"
                    )}
                  ></line>
                </svg>
                <SignedOut>
                  <SignInButton mode="modal">
                    <Button
                      variant="secondary"
                      className="hidden md:inline-flex items-center cursor-pointer dark:hover:bg-lime-400
                     hover:text-white hover:border-blue-400 hover:bg-blue-500 dark:hover:text-black 
                     dark:hover:border-lime-400 transition"
                    >
                      Log In
                    </Button>
                  </SignInButton>
                </SignedOut>
                <SignedOut>
                  <SignUpButton mode="modal">
                    <Button
                      variant="primary"
                      className="hidden md:inline-flex items-center cursor-pointer
                      not-dark:bg-blue-500 not-dark:text-white not-dark:border-blue-400"
                    >
                      Sign Up
                    </Button>
                  </SignUpButton>
                </SignedOut>
                <div className="hidden md:block">
                  <SignedIn>
                    <UserButton
                      showName={true}
                      appearance={{
                        elements: {
                          userButtonBox: "text-black dark:text-white",
                        },
                      }}
                    />
                  </SignedIn>
                </div>
              </div>
            </div>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-col items-center gap-4 py-4">
                    {NavLinks.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                    <SignedOut>
                      <SignInButton mode="modal">
                        <Button
                          variant="secondary"
                          className="hover:bg-lime-400 hover:text-black hover:border-lime-400 transition"
                        >
                          Log In
                        </Button>
                      </SignInButton>
                    </SignedOut>
                    <SignedOut>
                      <SignUpButton mode="modal">
                        <Button
                          variant="primary"
                          className="not-dark:bg-blue-500 not-dark:text-white not-dark:border-blue-400"
                        >
                          Sign Up
                        </Button>
                      </SignUpButton>
                    </SignedOut>

                    <SignedIn>
                      <UserButton
                        showName={true}
                        appearance={{
                          elements: {
                            userButtonBox: "text-black dark:text-white",
                          },
                        }}
                      />
                    </SignedIn>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>
      <div className="pb-[86px] md:pb-[96px] lg:pb-[130px]" />
    </>
  );
};

export default Navbar;
