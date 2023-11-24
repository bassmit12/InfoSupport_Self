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
import Restricted from "./pages/Restricted.tsx";
import Dashboard from "./pages/Dashboard/Dashboard.tsx";

function App() {
  const user = useRecoilValue(userAtom);
  const isStaff = user && user.role === "Staff";
  const isAdmin = user && user.role === "Admin";

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
          element={
            user ? (
              isAdmin || isStaff ? (
                <KitchenPage />
              ) : (
                <Navigate to="/restricted" />
              )
            ) : (
              <Navigate to="/auth" />
            )
          }
        />
        <Route
          path="/Dashboard"
          element={isAdmin ? <Dashboard /> : <Navigate to="/restricted" />}
        />
        <Route
          path="/auth"
          element={!user ? <AuthPage /> : <Navigate to="/Menu" />}
        />
        <Route path="restricted" element={<Restricted />} />
      </Routes>
      <ToastContainer />
    </Suspense>
  );
}

export default App;
