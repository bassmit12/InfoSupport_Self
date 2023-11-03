import { Suspense } from "react";
import FrontPage from "./pages/Users/FrontPage";
import Home from "./pages/Users/Home";
import ItemDetails from "./pages/Users/ItemDetails";
import { Route, Routes } from "react-router-dom";
import TransactionPage from "./pages/Users/TransactionPage";

function App() {
  return (
    <Suspense fallback="loading">
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/details" element={<ItemDetails />} />
        <Route path="/TransactionPage" element={<TransactionPage />} />
        <Route path="/Menu" element={<Home />} />
      </Routes>
    </Suspense>
  );
}

export default App;
