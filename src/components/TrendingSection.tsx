import React from "react";
import { Link } from "react-router-dom";
import { TrendingCoin } from "./TrendingCoin";

interface Props {
  data: ITrendingCoin[] | undefined;
}

export interface ITrendingCoin {
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
