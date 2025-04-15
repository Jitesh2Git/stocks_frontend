import React from "react";
import logo from "../assets/images/logo.png";
import Image from "next/image";
import { FooterLinks } from "../constants";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="py-10 bg-gray-900 text-white mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6 text-center md:text-left">
          <Link href="/" className="flex justify-center md:justify-start">
            <Image src={logo} alt="Logo" width={150} height={150} />
          </Link>

          <nav className="flex flex-wrap justify-center md:justify-end gap-6">
            {FooterLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-white/70 hover:text-lime-400 transition"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-8 text-center text-white/50 text-sm">
          © {new Date().getFullYear()} SoftStock. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
