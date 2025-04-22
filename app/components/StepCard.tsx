import React from "react";
import { twMerge } from "tailwind-merge";

interface FeatureCardProps {
  title: string;
  description: string;
  children?: React.ReactNode;
  className?: string;
}

const StepCard = ({
  title,
  description,
  children,
  className,
}: FeatureCardProps) => {
  return (
    <div
      className={twMerge(
        "bg-blue-50 dark:bg-neutral-900 border dark:border-white/10 p-6 rounded-3xl",
        className
      )}
    >
      {children}
      <div>
        <h3 className="text-3xl font-medium mt-6">{title}</h3>
        <p className="dark:text-white/50 mt-2">{description}</p>
      </div>
    </div>
  );
};

export default StepCard;
