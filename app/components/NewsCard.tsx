"use client";

import Image from "next/image";
import moment from "moment";
import Link from "next/link";
import Button from "./Button";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface NewsItem {
  uuid: string;
  title: string;
  description: string;
  url: string;
  image_url?: string;
  published_at: string;
  source: string;
}

interface ArticleProps {
  newsItem: NewsItem;
  ticker?: string;
}

const NewsCard = ({ newsItem, ticker }: ArticleProps) => {
  const router = useRouter();
  const { isSignedIn } = useUser();
  const companyTicker = ticker?.toLowerCase();

  const handleClick = () => {
    if (!isSignedIn) {
      toast.error("Please sign in to use the feature!");
      return;
    }
    router.push(`/predictions/${companyTicker}/${newsItem.uuid}`);
  };

  return (
    <section
      key={newsItem.uuid}
      className="flex flex-col lg:flex-row items-center gap-5 lg:gap-10 max-sm:text-sm 
   border border-white/50 rounded-xl px-5 py-5 w-full max-w-6xl mx-auto overflow-hidden"
    >
      <div className="flex flex-col items-center gap-5">
        {newsItem.image_url && (
          <div className="w-[260px] h-[150px] overflow-hidden rounded-lg shadow-md flex-shrink-0">
            <Image
              src={newsItem.image_url}
              alt={newsItem.title}
              width={260}
              height={150}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        {ticker && (
          <Button
            variant="primary"
            className="rounded-sm w-full cursor-pointer"
            onClick={handleClick}
          >
            Analyze
          </Button>
        )}
      </div>

      <div className="flex-1 space-y-4 overflow-hidden">
        <h1 className="text-2xl lg:text-3xl capitalize font-medium max-sm:text-xl break-words">
          {newsItem.title}
        </h1>
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold">
            By :{" "}
            <span className="font-normal dark:text-gray-300">
              {newsItem.source}
            </span>
          </h2>
          {newsItem.url && (
            <h2 className="font-semibold break-all">
              Source :{" "}
              <Link
                href={newsItem.url}
                target="_blank"
                className="underline decoration-lime-400 
          underline-offset-4 font-normal dark:text-gray-300"
              >
                {newsItem.url}
              </Link>
            </h2>
          )}
          <p className="font-semibold">
            Published At :{" "}
            <span className="font-normal dark:text-gray-300">
              {moment(newsItem.published_at).format("Do MMM YYYY")}
            </span>
          </p>
          {newsItem.description && (
            <p className="font-semibold break-words">
              Description :{" "}
              <span className="font-normal dark:text-gray-300">
                {newsItem.description}
              </span>
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewsCard;
