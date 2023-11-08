import { Suspense } from "react";
import FrontPage from "./pages/Users/FrontPage";
import Home from "./pages/Users/Home";
import ItemDetails from "./pages/Users/ItemDetails";
import { Navigate, Route, Routes } from "react-router-dom";
import TransactionPage from "./pages/Users/TransactionPage";
import { useRecoilValue } from "recoil";
import userAtom from "./atoms/userAtom.ts";
import AuthPage from "./pages/Users/AuthPage.js";
import LoginCard from "./components/auth/LoginCard.tsx";

function App() {
  const user = useRecoilValue(userAtom);
  return (
    <Suspense fallback="loading">
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/Item/:id" element={<ItemDetails />} />
        <Route path="/Cart" element={<TransactionPage />} />
        <Route
          path="/Menu"
          element={user ? <Home /> : <Navigate to="/auth" />}
        />
        <Route
          path="/auth"
          element={!user ? <AuthPage /> : <Navigate to="/Menu" />}
        />
        <Route path="/authV2" element={<LoginCard />} />
      </Routes>
    </Suspense>
  );
}

export default App;
