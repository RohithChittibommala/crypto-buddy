import { Link } from "react-router-dom";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { ICoin } from "./Home";

export interface CoinProps {
  coin: ICoin;
  index: number;
  sparkLineData: Array<Array<number>>;
}

export const convertNumToInr = (num: number) => {
  return num.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    currencyDisplay: "symbol",
    maximumSignificantDigits: 4,
  });
};

let formatter = (digit: number) =>
  new Intl.NumberFormat("inr", {
    style: "currency",
    notation: "compact",
    currency: "inr",
    maximumSignificantDigits: digit,
  });

function Coin({ coin, sparkLineData, index }: CoinProps) {
  return (
    <tr key={coin.id} className="text-left ">
      {/* <td className=" px-4 py-2 ">{index + 1}</td> */}
      <td className=" px-4 py-2">
        <div className="flex space-x-4">
          <span>
            <img src={coin.image} className="h-6 w-6 object-contain" alt="" />
          </span>
          <span className="font-medium text-gray-800 text-base hover:underline">
            <Link to={`/${coin.id}`}>{coin.name}</Link>
          </span>
          <span className="uppercase font-normal text-gray-500">
            {coin.symbol}
          </span>
        </div>
      </td>

      <td className=" px-4 py-2 font-mulish ">
        {convertNumToInr(coin.current_price)}
      </td>

      <td
        className={` px-4 py-2 font-mulish ${
          parseFloat(coin.price_change_percentage_24h) < 0
            ? "text-red-600"
            : "text-green-600"
        }`}
      >
        {parseFloat(coin.price_change_percentage_24h) > 0 ? "+" : ""}
        {parseFloat(coin.price_change_percentage_24h).toFixed(3)} %
      </td>

      <td className="px-4 py-2  flex items-center ">
        <Sparklines data={sparkLineData[index]}>
          <SparklinesLine
            color={
              parseFloat(coin.price_change_percentage_24h) < 0 ? "red" : "green"
            }
          />
        </Sparklines>
      </td>

      <td className=" px-4 py-2 font-mulish">
        {formatter(3).format(coin.market_cap)}
      </td>
    </tr>
  );
}

export default Coin;
