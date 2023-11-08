import { useSetRecoilState } from "recoil";
import userAtom from "../../atoms/userAtom.js";
import { FiLogOut } from "react-icons/fi";

const LogoutButton = () => {
  const setUser = useSetRecoilState(userAtom);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      if (data.error) {
        console.error(data.error);
        return;
      }

      localStorage.removeItem("user-threads");
      setUser(null);
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
