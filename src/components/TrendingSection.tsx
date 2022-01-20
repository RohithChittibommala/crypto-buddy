import React from "react";
import { isError, useQuery } from "react-query";
import { Link } from "react-router-dom";
import api from "../network";

interface Props {
  data: ITrendingCoin[] | undefined;
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

function TrendingSection({ data }: Props) {
  return (
    <>
      <h2 className="text-3xl  font-mulish font-extrabold">Trending Coins</h2>
      <div className="flex p-2 my-3  flex-wrap ">
        {data?.map((coin: ITrendingCoin) => (
          <Link key={coin.id} to={`/${coin.id}`}>
            <TrendingCoin coin={coin} />
          </Link>
        ))}
      </div>
    </>
  );
}

export default React.memo(TrendingSection);

function TrendingCoin({ coin }: { coin: ITrendingCoin }) {
  return (
    <div className="border p-4 mr-3 shadow  md:w-52  font-mulish  rounded-lg my-2 transition hover:bg-gray-50 cursor-pointer">
      <img src={coin.large} className="w-10 h-10 object-contain my-3" />
      <h3 className=" text-gray-800  font-bold ">{coin?.name} </h3>
      <span className="text-gray-600 text-sm font-semibold">{coin.symbol}</span>
      <h4>Market Cap Rank : {coin.market_cap_rank}</h4>
    </div>
  );
}
