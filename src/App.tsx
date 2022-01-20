import { Route, Routes } from "react-router-dom";
import CoinDetail from "./components/CoinDetail";
import Home from "./components/Home";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:id" element={<CoinDetail />} />
    </Routes>
  );
};

export default App;
