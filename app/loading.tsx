"use client";

import { Variants, motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="grid place-content-center bg-black h-screen max-h-screen w-full">
      <BarLoader />
    </div>
  );
};

const variants = {
  initial: {
    scaleY: 0.5,
    opacity: 0,
  },
  animate: {
    scaleY: 1,
    opacity: 1,
    transition: {
      repeat: Infinity,
      repeatType: "mirror",
      duration: 1,
      ease: "circIn",
    },
  },
} as Variants;

const BarLoader = () => {
  return (
    <motion.div
      transition={{
        staggerChildren: 0.25,
      }}
      initial="initial"
      animate="animate"
      className="flex gap-1"
    >
      <motion.div variants={variants} className="h-12 w-2 bg-lime-400" />
      <motion.div variants={variants} className="h-12 w-2 bg-lime-400" />
      <motion.div variants={variants} className="h-12 w-2 bg-lime-400" />
      <motion.div variants={variants} className="h-12 w-2 bg-lime-400" />
      <motion.div variants={variants} className="h-12 w-2 bg-lime-400" />
    </motion.div>
  );
};

export default Loader;
