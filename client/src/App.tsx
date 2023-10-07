import FrontPage from "./pages/Users/FrontPage";
import Home from "./pages/Users/Home";
import ItemDetails from "./pages/Users/ItemDetails";
import { Route, Routes } from "react-router-dom";
import TransactionPage from "./pages/Users/TransactionPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<FrontPage />} />
      <Route path="/details" element={<ItemDetails />} />
      <Route path="/TransactionPage" element={<TransactionPage />} />
    </Routes>
  );
}

export default App;
