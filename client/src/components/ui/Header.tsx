import { useState, useEffect } from "react";
import { IonIcon } from "@ionic/react";
import { cartOutline, cart } from "ionicons/icons";
import Logo from "../../assets/Menu_Masters_Logo.png";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LANGUAGES } from "../../utils/constants/Languages";
import LogoutButton from "../auth/LogoutButton";
import { useRecoilValue } from "recoil";
import userAtom from "../../atoms/userAtom";

const Header = () => {
  const { i18n } = useTranslation();
  const user = useRecoilValue(userAtom);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isCartHovered, setIsCartHovered] = useState(false);
  const [updateTrigger, setUpdateTrigger] = useState(false);

  useEffect(() => {
    // Fetch cart data from the backend API endpoint
    const fetchCartData = async () => {
      try {
        const response = await fetch("/api/cart", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCartItemCount(data.items.length || 0);
          // Trigger a re-render by toggling the updateTrigger state
          setUpdateTrigger((prev) => !prev);
        } else {
          console.error("Error fetching cart data:");
        }
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    // Call the fetchCartData function
    fetchCartData();
  }, [updateTrigger]); // Empty dependency array ensures the effect runs once after the initial render

  const getCartIcon = () => {
    if (isCartHovered) {
      return {
        icon: cart,
        fill: "red",
      };
    } else {
      return {
        icon: cartOutline,
        fill: "",
      };
    }
  };

  return (
    <nav className="max-w-screen-xl mx-auto">
      <div className="flex justify-between items-center">
        <Link to="/Menu">
          <img src={Logo} className="w-56 h-auto cursor-pointer" alt="Logo" />
        </Link>

        <div className="flex flex-row gap-x-5 px-6 relative cursor-pointer">
          <h1>{user?.username}</h1>

          <Link
            to="/Cart"
            className="relative cart-link"
            onMouseEnter={() => setIsCartHovered(true)}
            onMouseLeave={() => setIsCartHovered(false)}
          >
            <div className="flex items-center mt-0.5">
              <IonIcon
                icon={getCartIcon().icon}
                size="small"
                style={{ fill: getCartIcon().fill }}
              />
              {cartItemCount > 0 && (
                <div className="bg-red-500 rounded-full w-5 h-5 text-white flex items-center justify-center absolute -top-4 -right-4">
                  {cartItemCount}
                </div>
              )}
            </div>
          </Link>

          <select
            defaultValue={i18n.language}
            onChange={(e) => {
              const langCode = e.target.value;
              if (LANGUAGES.some((language) => language.code === langCode)) {
                i18n.changeLanguage(langCode);
              }
            }}
            className="bg-white cursor-pointer"
          >
            {LANGUAGES.map(({ code, label }) => (
              <option key={code} value={code}>
                {label}
              </option>
            ))}
          </select>
          <LogoutButton />
        </div>
      </div>
    </nav>
  );
};

export default Header;
