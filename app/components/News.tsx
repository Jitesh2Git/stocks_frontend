"use client";

import React, { useState, useEffect } from "react";
import Tag from "./Tag";
import { getStockNews } from "../actions";
import { CompanyNames, Tickers } from "../constants";
import NewsCard from "./NewsCard";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

interface NewsItem {
  uuid: string;
  title: string;
  description: string;
  url: string;
  image_url: string;
  published_at: string;
  source: string;
}

type NewsProps = NewsItem[];

const News = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [loading, setLoading] = useState(false);
  const [news, setNews] = useState<NewsProps>([]);

  useEffect(() => {
    async function fetchNews() {
      setLoading(true);
      const selectedTicker = Tickers[activeIndex];
      const storageKey = `news_${selectedTicker}`;
      const cachedNews = localStorage.getItem(storageKey);

      if (cachedNews) {
        setNews(JSON.parse(cachedNews));
      } else {
        try {
          const data = await getStockNews(selectedTicker);
          const newsData = data?.data || [];
          setNews(newsData);
          localStorage.setItem(storageKey, JSON.stringify(newsData));
        } catch (error) {
          console.error("Error fetching stock news:", error);
        }
      }

      setLoading(false);
    }

    fetchNews();
  }, [activeIndex]);

  return (
    <section id="news" className="py-24 px-5 scroll-mt-10">
      <div className="mb-10">
        <div className="flex justify-center mb-8">
          <Tag>Company News</Tag>
        </div>
        <h2 className="text-5xl sm:text-6xl font-medium mt-6 max-w-2xl mx-auto text-center">
          Stay updated, <span className="text-lime-400">analyze instantly</span>
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 max-w-7xl mx-auto">
        {CompanyNames.map((company, index) => (
          <div
            key={index}
            className={`rounded-lg transition-colors 
          ${activeIndex === index + 1 ? "bg-global" : "bg-lime-400"}`}
          >
            <button
              className={`w-full origin-top-left rounded-lg border py-3 text-xs font-medium 
            transition-all md:text-base bg-neutral-950 cursor-pointer
            ${
              activeIndex === index + 1
                ? "border-lime-400 text-lime-400 -translate-y-1"
                : "border-white/50 text-white hover:-rotate-2"
            }`}
              onClick={() => setActiveIndex(index + 1)}
            >
              {company}
            </button>
          </div>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center mt-10">
          <DotLottieReact
            src="/loading.lottie"
            loop
            autoplay
            style={{ width: 180, height: 180 }}
          />
        </div>
      ) : (
        <div className="max-w-6xl mx-auto mt-16 space-y-10">
          {news.length > 0 ? (
            news.map((newsItem) => (
              <NewsCard
                key={newsItem.uuid}
                newsItem={newsItem}
                ticker={Tickers[activeIndex]}
              />
            ))
          ) : (
            <p className="text-center text-lime-400 text-lg font-medium bg-neutral-900 p-4 rounded-lg">
              🚀 Stay tuned! Fresh updates will be available soon.
            </p>
          )}
        </div>
      )}
    </section>
  );
};

export default News;
