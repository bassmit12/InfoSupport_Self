import FrontPage from "./pages/FrontPage";
import Home from "./pages/Home";
import ItemDetails from "./pages/ItemDetails";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<FrontPage />} />
      <Route path="/details" element={<ItemDetails />} />
    </Routes>
  );
}

export default App;
