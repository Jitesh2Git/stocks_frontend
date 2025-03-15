import React from "react";
import Tag from "./Tag";
import StepCard from "./StepCard";
import { Newspaper, BrainCircuit, TrendingUp } from "lucide-react";

const Steps = () => {
  return (
    <section id="steps" className="py-24 px-5 scroll-mt-10">
      <div className="container mx-auto text-center">
        <div className="flex justify-center">
          <Tag>How it works</Tag>
        </div>
        <h2 className="text-5xl sm:text-6xl font-medium mt-6 max-w-2xl mx-auto">
          Turning news into <span className="text-lime-400">opportunity</span>
        </h2>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <StepCard
            title="Submit News Headline"
            description="Enter a news headline and select a company, or directly analyze an existing news article."
          >
            <div className="flex justify-center">
              <Newspaper size={60} className="text-lime-400" />
            </div>
          </StepCard>

          <StepCard
            title="Analyze News Sentiment"
            description="Our NLP sentiment analysis model determines the news sentiment."
          >
            <div className="flex justify-center">
              <BrainCircuit size={60} className="text-lime-400" />
            </div>
          </StepCard>

          <StepCard
            title="Predict Stock Sentiment"
            description="Analyze sentiment to gauge potential impact on stock trends."
          >
            <div className="flex justify-center">
              <TrendingUp size={60} className="text-lime-400" />
            </div>
          </StepCard>
        </div>
      </div>
    </section>
  );
};

export default Steps;
