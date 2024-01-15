// SignUpCard.tsx

import React, { useState } from "react";
import { signupUser } from "../../utils/api";
import useCustomToast from "../../hooks/useToast";
import LoadingSpinner from "../../hooks/useLoadingSpinner";

const SignUpCard = () => {
  const { showSuccessToast, showErrorToast } = useCustomToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    tableNumber: 0,
    capacity: 0,
    username: "",
    password: "",
    confirmPassword: "",
    role: "User",
  });

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Add validation or other necessary checks here before making the request
      if (formData.password !== formData.confirmPassword) {
        showErrorToast("Passwords do not match");
        return;
      }

      const response = await signupUser(formData);

      if (response.code === "success") {
        showSuccessToast("Account created successfully");
        // Optionally, you can redirect the user to the login page or perform other actions
      } else {
        showErrorToast("Error creating account. Please try again.");
        console.error("Signup error:", response.error);
      }
    } catch (error) {
      showErrorToast("Unexpected error during signup. Please try again.");
      console.error("Unexpected error during signup:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 border border-gray-100">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-red-500 md:text-2xl ">
              Create an account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSignup}>
              <div>
                <label className="block mb-2 text-sm font-medium text-red-500">
                  Table Number
                </label>
                <input
                  type="number"
                  name="tableNumber"
                  id="tableNumber"
                  value={formData.tableNumber}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      tableNumber: Number(e.target.value),
                    }))
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 outline-none"
                  placeholder="Table Number"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-red-500">
                  Capacity
                </label>
                <input
                  type="number"
                  name="capacity"
                  id="capacity"
                  value={formData.capacity}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      capacity: Number(e.target.value),
                    }))
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 outline-none"
                  placeholder="Capacity"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-red-500">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      username: e.target.value,
                    }))
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 outline-none"
                  placeholder="Username"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-red-500">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      password: e.target.value,
                    }))
                  }
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-red-500">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      confirmPassword: e.target.value,
                    }))
                  }
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 outline-none"
                  required
                />
              </div>
              <div className="flex items-start">
                {/* Checkbox for terms and conditions */}
              </div>
              <button
                type="submit"
                className="w-full text-white bg-red-500 hover:bg-primary-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center outline-none"
              >
                {loading ? (
                  <LoadingSpinner size={20} color="#ffffff" />
                ) : (
                  "Create an account"
                )}
              </button>
              <p className="text-sm font-light text-gray-500 ">
                Already have an account?{" "}
                <a
                  href="#"
                  className="font-medium text-red-500 hover:underline"
                >
                  Login here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUpCard;
