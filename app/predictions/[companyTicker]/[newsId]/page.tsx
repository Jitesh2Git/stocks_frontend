import NewsCard from "@/app/components/NewsCard";
import { Tickers } from "@/app/constants";
import { getNewsById, getStockPredictions } from "@/app/actions";
import StockGaugeChart from "@/app/components/StockGaugeChart";
import PredictionForm from "@/app/components/PredictionForm";

interface PredictionsPageProps {
  params: {
    companyTicker: string;
    newsId: string;
  };
}

const PredictionsPage = async ({ params }: PredictionsPageProps) => {
  const { companyTicker, newsId } = await params;

  const newsItem = await getNewsById(newsId);

  const tickerIndex = Tickers.findIndex(
    (ticker) => ticker.toLowerCase() === companyTicker.toLowerCase()
  );

  const predictions = await getStockPredictions(
    newsItem.description,
    tickerIndex
  );

  return (
    <div className="max-w-6xl mx-auto p-5 min-h-screen">
      <PredictionForm currentTicker={companyTicker} />

      <NewsCard newsItem={newsItem} />
      <section
        className="mt-6 border border-white/50 rounded-xl px-5 py-5 w-full max-w-6xl mx-auto 
         shadow-lg text-white"
      >
        <h2 className="text-xl sm:text-2xl font-semibold text-center mb-5">
          Stock Prediction Insights
        </h2>

        <StockGaugeChart
          probability_close={predictions.probability_close}
          probability_trade={predictions.probability_trade}
        />
      </section>
    </div>
  );
};

export default PredictionsPage;
