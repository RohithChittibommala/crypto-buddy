import { AxiosResponse } from "axios";
import { useQuery } from "react-query";
import Loading from "./Loading";
import api from "../network";
import { useMemo, useState } from "react";
import Coin from "./Coin";
import TrendingSection from "./TrendingSection";

export interface ICoin {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  image: string;
  price_change_percentage_24h: string;
  market_cap: number;
  sparkline_in_7d: {
    price: number[];
  };
}

interface ITrendingCoin {
  coin_id: number;
  id: string;
  large: string;
  market_cap_rank: number;
  name: number;
  score: number;
  slug: string;
  small: string;
  symbol: string;
  thumb: string;
}

const tableHeaders = [
  "Coin",
  "Price",
  "Change (24h)",
  "Price Chart (7d)",
  "Market Cap",
];

const simplySparkLineData = (data: ICoin[]) => {
  if (!data) return [];

  const sparkLineData: Array<Array<number>> = [];

  data?.forEach((coin: ICoin) =>
    sparkLineData.push(coin.sparkline_in_7d.price)
  );

  return sparkLineData;
};

const Home = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useQuery(
    ["coins", page],
    () => api.getCoinList(page),
    {
      select: (data: AxiosResponse) => {
        return data.data;
      },

      keepPreviousData: true,
      onSuccess: scrollToTop,
    }
  );

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  const {
    data: trendingSectionData,
    isLoading: trendingSectionLoading,
    isError: trendingSectionIsError,
    error: trendingSectionError,
  } = useQuery("trending", api.getTrendingCoins, {
    select: (data): ITrendingCoin[] =>
      data?.data?.coins.map((coin: { item: ITrendingCoin }) => coin.item),
  });

  const sparkLineData = useMemo(() => simplySparkLineData(data), [data]);

  if (isLoading || trendingSectionLoading) return <Loading />;

  if (isError || trendingSectionIsError) return <div>error occured</div>;

  // console.log(process.env.API_KEY);

  return (
    <div className="container md:p-10  w-full md:w-4/5 mx-auto">
      <TrendingSection data={trendingSectionData} />

      <div className="rounded-md border border-gray-200 ">
        <table className="coin-table ">
          <thead className="border-b">
            <tr>
              {tableHeaders.map((header) => (
                <th key={header} className="px-4 py-3 text-base font-normal">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="mt-1">
            {data.map((coin: ICoin, index: number) => (
              <Coin
                coin={coin}
                key={coin.id}
                index={index}
                sparkLineData={sparkLineData}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex mx-auto w-40 font-mulish mt-3">
        <button
          className={page <= 1 ? "disabled" : "btn"}
          onClick={() => setPage((page) => page - 1)}
        >
          <BackIcon />
          <span>Prev</span>
        </button>
        <button
          className={page >= 100 ? "disabled" : "btn"}
          onClick={() => setPage((page) => page + 1)}
        >
          <span>Next</span>
          <NextIcon />
        </button>
      </div>
    </div>
  );
};
export default Home;

function NextIcon() {
  return (
    <svg
      className="h-5 w-5"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function BackIcon() {
  return (
    <svg
      className="h-5 w-5"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}
