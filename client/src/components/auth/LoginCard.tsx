import { useState } from "react";
import { useSetRecoilState } from "recoil";
import authScreenAtom from "../../atoms/authAtom";
import userAtom from "../../atoms/userAtom";
import useCustomToast from "../../hooks/useToast";
import LoadingSpinner from "../../hooks/useLoadingSpinner";
import { loginUser } from "../../utils/api";

export default function LoginCard() {
  const [showPassword] = useState(false); //add SetShowPassword if you want to make the text visible
  const setAuthScreen = useSetRecoilState(authScreenAtom);
  const { showSuccessToast, showErrorToast } = useCustomToast();
  const [loading, setLoading] = useState(false);

  const setUser = useSetRecoilState(userAtom);
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const handleLogin = async () => {
    try {
      setLoading(true);

      const response = await loginUser(inputs); // Use the new request

      if (response.code === "success") {
        showSuccessToast("Logged in successfully");
        localStorage.setItem("user-threads", JSON.stringify(response.data));
        setUser(response.data);
      } else {
        showErrorToast("Error while logging in");
        console.error(response.error);
      }
    } catch (error) {
      showErrorToast("Error while logging in");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 border border-gray-100">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-red-500 md:text-2xl ">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label className="block mb-2 text-sm font-medium text-red-500 ">
                  Username
                </label>
                <input
                  type="text"
                  value={inputs.username}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5 outline-none"
                  placeholder="Username"
                  onChange={(e) =>
                    setInputs((inputs) => ({
                      ...inputs,
                      username: e.target.value,
                    }))
                  }
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-red-500 ">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={inputs.password}
                  onChange={(e) =>
                    setInputs((inputs) => ({
                      ...inputs,
                      password: e.target.value,
                    }))
                  }
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5 outline-none"
                  required
                />
              </div>
              <button
                type="button"
                className="w-full text-white bg-red-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                onClick={handleLogin}
              >
                {loading ? (
                  <LoadingSpinner size={20} color="#ffffff" />
                ) : (
                  "Login"
                )}
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don&apos;t have an account yet?{" "}
                <a
                  href="#"
                  className="font-medium text-red-500 hover:underline dark:text-primary-500"
                  onClick={() => setAuthScreen("signup")}
                >
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
