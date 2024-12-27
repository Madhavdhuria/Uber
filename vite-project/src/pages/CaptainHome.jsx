import { useContext, useEffect, useState } from "react";
import { captainContextdata } from "../context/CaptainContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CaptainHome = () => {
  const navigate = useNavigate();
  const { captain, setcaptain } = useContext(captainContextdata);
  const [error, setError] = useState("");

  const getDetails = async () => {
    try {
      let res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/captains/profile`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );

      setcaptain(res.data.captain);
      setError("");
    } catch (err) {
      if (err.response) {
        if (
          err.response.data.message === "UnAuthorized" ||
          err.response.data.message === "Authentication failed:"
        ) {
          localStorage.removeItem("token");
          navigate("/captainlogin");
        }
        setError(
          err.response.data.message || "Failed to fetch captain profile"
        );
      } else if (err.request) {
        setError("No response from the server. Please try again later.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
      console.error("Error fetching captain details:", err.message);
    }
  };

  const CaptainLogout = async () => {
    try {
      let res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/captains/logout`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        localStorage.removeItem("token");
        setcaptain({
          fullName: {
            firstName: "",
            lastName: "",
          },
          email: "",
          password: "",
          socketId: "",
          status: "inactive",
          vehicle: {
            color: "",
            plate: "",
            capacity: "",
            vehicleType: "motorcycle",
          },
          location: {
            lat: null,
            lng: null,
          },
        });
        navigate("/captainlogin");
      }
    } catch (err) {
      if (err.request) {
        setError("No response from the server. Please try again later.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
      console.error("Error logging out captain:", err.message);
    }
  };

  useEffect(() => {
    if (!captain.email) {
      getDetails();
    }
  }, []);

  return (
    <div>
      {error && (
        <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>
      )}
      {!error && (
        <div>
          <div>Welcome {captain.fullName.firstName || ""}</div>
          <button
            onClick={CaptainLogout}
            type="button"
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default CaptainHome;
