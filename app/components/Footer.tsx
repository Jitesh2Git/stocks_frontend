import React from "react";
import logo from "../assets/images/logo.png";
import Image from "next/image";
import { FooterLinks } from "../constants";
import Link from "next/link";
import { ChartCandlestick } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-10 bg-blue-200 dark:bg-gray-900 dark:text-white mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6 text-center md:text-left">
          <Link
            href="/"
            className="flex justify-center md:justify-start not-dark:hidden"
          >
            <Image src={logo} alt="Logo" width={150} height={150} />
          </Link>
          <div className="max-md:mx-auto dark:hidden">
            <Link href="/" className="flex items-center gap-2">
              <ChartCandlestick className="text-blue-500 size-6 sm:size-8 shrink-0" />
              <span className="text-xl sm:text-2xl font-medium text-black/80 font-mono">
                SoftStock
              </span>
            </Link>
          </div>

          <nav className="flex flex-wrap justify-center md:justify-end gap-6">
            {FooterLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="dark:text-white/70 hover:text-blue-500 dark:hover:text-lime-400 transition"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-8 text-center dark:text-white/50 text-sm">
          © {new Date().getFullYear()} SoftStock. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
