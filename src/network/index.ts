import Axios from "axios";

const axios = Axios.create({
  baseURL: "https://api.coingecko.com/api/v3",
});

const api = {
  getCoinList: (page: number) =>
    axios.get(
      `/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=25&page=${page}&sparkline=true`
    ),

  getTrendingCoins: () => axios.get(`search/trending?vs_currency=inr`),

  getCoinDetail: (id: any, timeFilter: string | number) =>
    axios.get(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=inr&days=${timeFilter}`
    ),
};

export default api;
