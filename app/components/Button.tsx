import clsx from "clsx";
import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "primary" | "secondary";
  size?: "sm" | "md";
}

const Button = ({
  variant,
  size = "md",
  className,
  children,
  ...otherProps
}: ButtonProps) => {
  const baseClasses = "border rounded-full font-medium whitespace-nowrap";

  const variantClasses = {
    primary: "bg-lime-400 text-neutral-950 border-lime-400",
    secondary:
      "border-blue-400 dark:border-white text-blue-400 dark:text-white bg-transparent",
  };

  const sizeClasses = {
    sm: "h-10 px-4 text-sm",
    md: "h-12 px-6",
  };

  return (
    <button
      className={clsx(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;
