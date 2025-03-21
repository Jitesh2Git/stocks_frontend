import NewsCard from "@/app/components/NewsCard";
import { CompanyNames, Tickers } from "@/app/constants";
import { getNewsById, getStockData, getStockPredictions } from "@/app/actions";
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

  const companyName =
    tickerIndex !== -1 ? CompanyNames[tickerIndex] : "Unknown Company";

  const predictions = await getStockPredictions(
    newsItem.description,
    tickerIndex
  );

  const stockData = await getStockData(companyTicker.toUpperCase());

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

      {stockData && (
        <div className="mt-6  border border-white/50 rounded-2xl p-6 shadow-xl text-white">
          <h2 className="text-xl sm:text-3xl font-bold text-center text-lime-400">
            Stock Overview for {stockData?.name || companyName}
          </h2>

          <p className="text-center dark:text-gray-300 mt-3 text-sm sm:text-lg">
            {stockData?.about}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
            {[
              { label: "Price", value: stockData?.price },
              { label: "Open", value: stockData?.open },
              { label: "High", value: stockData?.high },
              { label: "Low", value: stockData?.low },
              { label: "Prev Close", value: stockData?.previous_close },
              { label: "Volume", value: stockData?.volume },
            ].map(({ label, value }, index) => (
              <div
                key={index}
                className="p-4 bg-white/10 rounded-xl text-center shadow-md hover:bg-white/20 transition-all duration-300"
              >
                <p className="text-sm sm:text-lg font-semibold text-lime-400">
                  {label}
                </p>
                <p className="text-sm sm:text-xl font-medium mt-1">
                  {value || "N/A"}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PredictionsPage;
