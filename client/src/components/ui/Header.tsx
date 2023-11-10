import React from "react";
import Logo from "../../assets/Menu_Masters_Logo.png";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LANGUAGES } from "../../constants/Languages";
import LogoutButton from "../auth/LogoutButton";
import { useRecoilValue } from "recoil";
import userAtom from "../../atoms/userAtom";

const Header = () => {
  const { i18n, t } = useTranslation();
  const user = useRecoilValue(userAtom);

  const onChangeLang = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang_code = e.target.value;
    i18n.changeLanguage(lang_code);
    console.log(user);
  };

  return (
    <nav className="max-w-screen-xl mx-auto">
      <div className="flex justify-between items-center">
        <Link to="/Menu">
          <img src={Logo} className="w-56 h-auto" />
        </Link>

        <div className="flex flex-row gap-x-5 px-6 ">
          <h1>{user?.username}</h1>

          <Link to="/Cart">
            <div>{t("shoppingcart")}</div>
          </Link>

          <select
            defaultValue={i18n.language}
            onChange={onChangeLang}
            className="bg-white"
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