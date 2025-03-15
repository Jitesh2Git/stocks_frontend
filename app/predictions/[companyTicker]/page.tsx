import { CompanyNames, Tickers } from "@/app/constants";
import { getStockPredictions } from "@/app/actions";
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
  const headline = await (searchParams.headline || "No headline provided");

  const tickerIndex = Tickers.findIndex(
    (ticker) => ticker.toLowerCase() === companyTicker.toLowerCase()
  );

  const companyName =
    tickerIndex !== -1 ? CompanyNames[tickerIndex] : "Unknown Company";

  const predictions =
    headline !== "No headline provided"
      ? await getStockPredictions(headline, tickerIndex)
      : null;

  return (
    <div className="max-w-6xl mx-auto p-5 min-h-screen">
      <PredictionForm currentTicker={companyTicker} />

      <div className="mt-6 border border-white/50 rounded-xl px-5 py-5 shadow-lg text-white">
        <h2 className="text-xl sm:text-2xl font-semibold text-center">
          Stock Prediction Insights for {companyName}
        </h2>

        <p className="text-center text-lg text-white/80 my-5">
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
    </div>
  );
};

export default PredictionsPage;
