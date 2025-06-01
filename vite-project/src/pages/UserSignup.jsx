import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import axios from "axios";
import { useContext } from "react";
import { UserContextData } from "../context/UserContext";

export default function SignupPage() {
  const [fullName, setFullName] = useState({ firstName: "", lastName: "" });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();
  const { setuser } = useContext(UserContextData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    const newUser = {
      fullName,
      email,
      password,
    };

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register`,
        newUser,
        {
          withCredentials: true,
        }
      );

      if (res.status === 201) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", "user");
        setuser(res.data.user);
        navigate("/home");
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message || "Registration failed.");
      } else {
        setErrorMessage("Network error. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
          <div className="flex justify-center mb-6">
            <Logo />
          </div>
          <div>
            <h2 className="mt-4 text-center text-2xl sm:text-3xl font-extrabold text-gray-900">
              User SignUp
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Join us and unlock all features
            </p>
          </div>
          {errorMessage && (
            <div className="text-red-500 text-center mb-4">{errorMessage}</div>
          )}
          <form className="mt-8 space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <input
                    id="firstName"
                    name="fullName[firstName]"
                    type="text"
                    required
                    minLength={3}
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                    placeholder="First Name"
                    value={fullName.firstName}
                    onChange={(e) =>
                      setFullName({ ...fullName, firstName: e.target.value })
                    }
                  />
                </div>
                <div>
                  <input
                    id="lastName"
                    name="fullName[lastName]"
                    type="text"
                    minLength={3}
                    required
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                    placeholder="Last Name"
                    value={fullName.lastName}
                    onChange={(e) =>
                      setFullName({ ...fullName, lastName: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="mb-4">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm sm:text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 ease-in-out"
            >
              Sign up
            </button>
          </form>
          <div className="mt-6 text-sm text-center">
            <p>
              Already have an account?{" "}
              <Link
                to="/UserLogin"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                User Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
