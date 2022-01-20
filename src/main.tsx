import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

const queryClient = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <App />
    </BrowserRouter>

    {/* {process.env.NODE_ENV === "development" && (
    )} */}

    {process.env.NODE_ENV === "development" && (
      <ReactQueryDevtools position="bottom-right" />
    )}
  </QueryClientProvider>,

  document.getElementById("root")
);
