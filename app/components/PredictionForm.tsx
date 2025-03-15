"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { CompanyNames } from "@/app/constants";
import Button from "./Button";
import { ChevronDown } from "lucide-react";

interface PredictionFormProps {
  currentTicker: string;
}

const PredictionForm = ({ currentTicker }: PredictionFormProps) => {
  const router = useRouter();
  const [selectedCompany, setSelectedCompany] = useState(currentTicker);
  const [headline, setHeadline] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!headline.trim() || !selectedCompany) return;

    const query = new URLSearchParams({ headline }).toString();
    router.push(`/predictions/${selectedCompany}?${query}`);
  };

  return (
    <div className="my-10">
      <p className="text-white/50 text-center mb-4 text-2xl font-semibold">
        Want to analyze your own news? Enter a{" "}
        <span className="text-lime-400/80">headline</span> and{" "}
        <span className="text-lime-400/80">select a company</span> to see its
        impact.
      </p>
      <form
        onSubmit={handleSubmit}
        className="flex max-sm:flex-wrap justify-center items-center rounded-full p-2 mt-8 max-w-lg 
        mx-auto w-full gap-3 shadow-md my-10"
      >
        <input
          type="text"
          value={headline}
          onChange={(e) => setHeadline(e.target.value)}
          placeholder="Enter news..."
          required
          className="bg-transparent px-4 flex-1 text-white outline-none border border-white/20 rounded-lg py-2"
        />

        <div className="relative w-full lg:w-auto">
          <select
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value)}
            required
            className="appearance-none bg-transparent px-4 py-2 text-white border border-white/20 rounded-lg outline-none cursor-pointer w-full pr-10"
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
           text-white pointer-events-none"
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          size="sm"
          className="whitespace-nowrap cursor-pointer px-5 py-2"
        >
          Analyze
        </Button>
      </form>
    </div>
  );
};

export default PredictionForm;
