import React, { ReactElement } from "react";
import { useQuery } from "react-query";
import { Line, Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useNavigate, useParams } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import api from "../network";

interface Props {}

type CoinPrice = [number, number];

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const timeFilterOptions = [
  {
    label: "1D",
    value: 1,
  },
  {
    label: "1W",
    value: 7,
  },
  {
    label: "1M",
    value: 30,
  },
  {
    label: "3M",
    value: 90,
  },
  {
    label: "1Y",
    value: 365,
  },
  {
    label: "ALL",
    value: "max",
  },
];

function CoinDetail({}: Props): ReactElement {
  const { id: coinId } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [timeFilter, setTimeFilter] = React.useState<string | number>(1);

  const opts = {
    plugins: {
      legend: {
        display: false,
      },

      tooltip: {
        intersect: false,
        titleFont: {
          size: 9,
        },
        bodyFont: {
          size: 16,
          weight: "bold",
        },
        displayColors: false,

        callbacks: {
          label: (tooltipItem: any) => {
            // console.log(Math.exp(tooltipItem.raw));
            if (Math.exp(tooltipItem.raw) < 2) {
              return (
                "\u20B9" +
                "0." +
                Math.exp(tooltipItem.raw).toString().split(".")[1]
              );
            }

            return new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",

              minimumFractionDigits: 3,
            }).format(
              tooltipItem.formattedValue.toString().split(",").join("")
            );
          },
        },
      },
    },

    animations: {
      tooltip: {
        duration: 0,
      },
    },

    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },

        ticks: {
          // display: false,

          callback: (value: any) => {
            // format to inr

            return new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",

              minimumFractionDigits: value < 0.00001 ? 9 : 2,
            }).format(value);
          },
        },
      },
    },
  };

  const { data, isLoading } = useQuery(
    ["coin-detail", { coinId, timeFilter }],
    () => api.getCoinDetail(coinId, timeFilter),
    {
      select: (data) =>
        data.data.prices.map((price: CoinPrice) => ({
          date:
            new Date(price[0]).toDateString() +
            " " +
            new Date(price[0]).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          price: price[1],
        })),
    }
  );

  if (isLoading)
    return (
      <div className="h-screen flex justify-center items-center">
        <SyncLoader color="#0052FF" />
      </div>
    );

  const lineChartData = {
    labels: data?.map((price: { date: Date }) => price.date),
    datasets: [
      {
        data: data?.map((price: { price: number }) => price.price),
        fill: false,
        lineTension: 0,
        borderColor: "#0052FF",
        borderWidth: 2,
        pointBorderColor: "rgba(0, 0, 0, 0)",
        pointBackgroundColor: "rgba(0, 0, 0, 0)",
        pointHoverBackgroundColor: "#0052FF",
        pointHoverBorderColor: "#0052FF",
      },
    ],
  };

  return (
    <div className="md:p-5 p-1">
      <div className="mx-auto md:w-3/4 mt-2">
        <div className="ml-8">
          <button
            className="p-2 uppercase flex border border-blue-200  transition hover:bg-slate-50 rounded-md text-blue-500"
            onClick={() => navigate(-1)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="ml-2">Go Back</span>
          </button>
        </div>

        <div className="border my-3 w-3/4  md:w-64  ml-auto flex border-gray-100 rounded ">
          {timeFilterOptions.map((timeFilterOption) => (
            <button
              key={timeFilterOption.value}
              onClick={() => setTimeFilter(timeFilterOption.value)}
              className={`p-2 flex-1 border-r ${
                timeFilter === timeFilterOption.value ? "bg-gray-100" : ""
              }`}
            >
              {timeFilterOption.label}
            </button>
          ))}
        </div>
        <Line data={lineChartData} options={opts} />
      </div>
    </div>
  );
}

export default CoinDetail;
