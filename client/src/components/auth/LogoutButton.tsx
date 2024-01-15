import { useSetRecoilState } from "recoil";
import userAtom from "../../atoms/userAtom.js";
import { FiLogOut } from "react-icons/fi";

import { logoutUser } from "../../utils/api"; // Import the new request

const LogoutButton = () => {
  const setUser = useSetRecoilState(userAtom);

  const handleLogout = async () => {
    try {
      const response = await logoutUser(); // Use the new request

      if (response.code === "success") {
        localStorage.removeItem("user-threads");
        setUser(null);
      } else {
        console.error(response.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button onClick={handleLogout}>
      <FiLogOut size={20} />
    </button>
  );
};

export default LogoutButton;
