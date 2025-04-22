import React, { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

const Tag = ({
  className,
  children,
  ...otherProps
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={twMerge(
        "inline-flex border border-blue-400 dark:border-lime-400 gap-2 text-blue-500 dark:text-lime-400 px-3 py-1 rounded-full uppercase items-center",
        className
      )}
      {...otherProps}
    >
      <span>&#10038;</span>
      <span className="text-sm">{children}</span>
    </div>
  );
};

export default Tag;
