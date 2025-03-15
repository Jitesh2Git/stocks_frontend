"use server";

import axios from "axios";

// Get news by symbols
export const getStockNews = async (symbols: string) => {
  try {
    const apiUrl = `${process.env.API_URL}/all?symbols=${symbols}
    &filter_entities=true&language=en&api_token=${process.env.API_TOKEN}`;

    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    return { errorMessage: error || "Failed to fetch news data." };
  }
};

// Get news by ID
export const getNewsById = async (newsId: string) => {
  try {
    const apiUrl = `${process.env.API_URL}/uuid/${newsId}?api_token=${process.env.API_TOKEN}`;

    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    return { errorMessage: error || "Failed to fetch news by ID." };
  }
};

// Get predictions from backend
export const getStockPredictions = async (
  headline: string,
  tickerIndex: number
) => {
  try {
    const apiUrl = `${process.env.BACKEND_URL}/predict`;

    const response = await axios.post(apiUrl, {
      headline,
      ticker: tickerIndex,
    });

    return response.data;
  } catch (error) {
    return { errorMessage: error || "Failed to fetch stock predictions." };
  }
};
