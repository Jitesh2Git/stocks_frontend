import { CompanyNames, Tickers } from "@/app/constants";
import { getStockData, getStockPredictions } from "@/app/actions";
import StockGaugeChart from "@/app/components/StockGaugeChart";
import PredictionForm from "@/app/components/PredictionForm";

interface PredictionsPageProps {
  params: {
    companyTicker: string;
  };
  searchParams: {
    headline?: string;
  };
}

const PredictionsPage = async ({
  params,
  searchParams,
}: PredictionsPageProps) => {
  const { companyTicker } = await params;
  const query = await searchParams;
  const headline = query.headline || "No headline provided";

  const tickerIndex = Tickers.findIndex(
    (ticker) => ticker.toLowerCase() === companyTicker.toLowerCase()
  );

  const ticker = CompanyNames.includes(companyTicker)
    ? Tickers[CompanyNames.indexOf(companyTicker)]
    : null;

  const companyName =
    tickerIndex !== -1 ? CompanyNames[tickerIndex] : "Unknown Company";

  const predictions =
    headline !== "No headline provided"
      ? await getStockPredictions(headline, tickerIndex)
      : null;

  const stockData = await getStockData(ticker as string);

  return (
    <div className="max-w-6xl mx-auto p-5 min-h-screen">
      <PredictionForm currentTicker={companyTicker} />

      <div className="mt-6 border dark:border-white/50 rounded-xl px-5 py-5 shadow-lg dark:text-white">
        <h2 className="text-xl sm:text-2xl font-semibold text-center">
          Stock Prediction Insights
        </h2>

        <p className="text-center text-lg dark:text-white/80 my-5">
          Headline: {headline}
        </p>

        {predictions ? (
          <StockGaugeChart
            probability_close={predictions.probability_close}
            probability_trade={predictions.probability_trade}
          />
        ) : (
          <p className="text-center text-red-400 mt-4">
            No predictions available. Please enter a headline.
          </p>
        )}
      </div>

      {stockData && (
        <div className="mt-6  border dark:border-white/50 rounded-2xl p-6 shadow-xl dark:text-white">
          <h2 className="text-xl sm:text-3xl font-bold text-center text-blue-500 dark:text-lime-400">
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
                className="p-4 bg-white/10 rounded-xl text-center shadow-md hover:bg-white/20 
                transition-all duration-300 not-dark:border not-dark:border-zinc-500"
              >
                <p className="text-sm sm:text-lg font-semibold text-blue-500 dark:text-lime-400">
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
