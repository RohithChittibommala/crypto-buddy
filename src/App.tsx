import React from "react";
import { Route, Routes } from "react-router-dom";
// import CoinDetail from "./components/CoinDetail";
import Home from "./components/Home";
import Loading from "./components/Loading";

const LazyCoinDetail = React.lazy(() => import("./components/CoinDetail"));

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/:id"
        element={
          <React.Suspense fallback={<Loading />}>
            <LazyCoinDetail />
          </React.Suspense>
        }
      />
    </Routes>
  );
};

export default App;
