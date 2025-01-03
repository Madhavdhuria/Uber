import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import { CaptainContextdata } from "../context/CaptainContext";

const RegistrationPage = () => {
  const { setcaptain } = useContext(CaptainContextdata);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      fullName: {
        firstName,
        lastName,
      },
      email,
      password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType,
      },
    };

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/register`,
        formData,
        { withCredentials: true }
      );
      

      if (res.status === 201) {
        localStorage.setItem("token", res.data.token);
        console.log(res.data);
        
        setcaptain(res.data.newCaptain);
        navigate("/captain-home");
      }
    } catch (error) {
      if (error.response) {
        const errorMessages = error.response.data.errors || [
          error.response.data.message,
        ];
        setErrors(errorMessages);
      } else if (error.request) {
        setErrors(["No response from server. Please try again later."]);
      } else {
        setErrors([error.message]);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 py-10 flex items-center flex-col justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Sign Up
          </h2>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {errors.length > 0 && (
              <div className="mb-4">
                {errors.map((error, index) => (
                  <p key={index} className="text-red-600 text-sm">
                    {error}
                  </p>
                ))}
              </div>
            )}
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="vehicleColor"
                  className="block text-sm font-medium text-gray-700"
                >
                  Vehicle Color
                </label>
                <input
                  type="text"
                  id="vehicleColor"
                  name="vehicleColor"
                  value={vehicleColor}
                  onChange={(e) => setVehicleColor(e.target.value)}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="vehiclePlate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Vehicle Plate
                </label>
                <input
                  type="text"
                  id="vehiclePlate"
                  name="vehiclePlate"
                  value={vehiclePlate}
                  onChange={(e) => setVehiclePlate(e.target.value)}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="vehicleCapacity"
                  className="block text-sm font-medium text-gray-700"
                >
                  Vehicle Capacity
                </label>
                <input
                  type="number"
                  id="vehicleCapacity"
                  name="vehicleCapacity"
                  value={vehicleCapacity}
                  onChange={(e) => setVehicleCapacity(e.target.value)}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="vehicleType"
                  className="block text-sm font-medium text-gray-700"
                >
                  Vehicle Type
                </label>
                <select
                  id="vehicleType"
                  name="vehicleType"
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="" disabled>
                    Select Vehicle Type
                  </option>
                  <option value="car">car</option>
                  <option value="motorcycle">motorcycle</option>
                  <option value="auto">auto</option>
                </select>
              </div>
            </div>w

            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
              >
                Sign Up
              </button>
            </div>
          </form>

          <div className="mt-6 text-sm text-center">
            <p>
              Already have an account?{" "}
              <Link
                to="/captainlogin"
                className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-300"
              >
                Captain Login
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 w-full max-w-md px-4">
        <Link
          to="/userSignup"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm sm:text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 ease-in-out"
        >
          Sign up as user
        </Link>
      </div>
    </div>
  );
};

export default RegistrationPage;
