import { Suspense } from "react";
import FrontPage from "./pages/Users/FrontPage";
import Home from "./pages/Users/Home";
import ItemDetails from "./pages/Users/ItemDetails";
import { Navigate, Route, Routes } from "react-router-dom";
import TransactionPage from "./pages/Users/TransactionPage";
import { useRecoilValue } from "recoil";
import userAtom from "./atoms/userAtom.ts";
import AuthPage from "./pages/Users/AuthPage.js";
import KitchenPage from "./pages/Staff/KitchenPage.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const user = useRecoilValue(userAtom);
  return (
    <Suspense fallback="loading">
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route
          path="/Item/:id"
          element={user ? <ItemDetails /> : <Navigate to="/auth" />}
        />
        <Route
          path="/Cart"
          element={user ? <TransactionPage /> : <Navigate to="/auth" />}
        />
        <Route
          path="/Menu"
          element={user ? <Home /> : <Navigate to="/auth" />}
        />
        <Route
          path="/KitchenPage"
          element={user ? <KitchenPage /> : <Navigate to="/auth" />}
        />
        <Route
          path="/auth"
          element={!user ? <AuthPage /> : <Navigate to="/Menu" />}
        />
      </Routes>
      <ToastContainer />
    </Suspense>
  );
}

export default App;
