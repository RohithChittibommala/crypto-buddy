import React from "react";
import { ITrendingCoin } from "./TrendingSection";

export function TrendingCoin({ coin }: { coin: ITrendingCoin }) {
  return (
    <div className="border p-4 mr-3 shadow  md:w-52  font-mulish  rounded-lg my-2 transition hover:bg-gray-50 cursor-pointer">
      <img src={coin.large} className="w-10 h-10 object-contain my-3" />
      <h3 className=" text-gray-800  font-bold ">{coin?.name} </h3>
      <span className="text-gray-600 text-sm font-semibold">{coin.symbol}</span>
      <h4>Market Cap Rank:{coin.market_cap_rank}</h4>
    </div>
  );
}
