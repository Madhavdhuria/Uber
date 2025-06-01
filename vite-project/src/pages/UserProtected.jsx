import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { SocketContext } from "../context/SocketContext";
import { UserContextData } from "../context/UserContext";

const UserProtected = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { socket } = useContext(SocketContext);
  const { setuser } = useContext(UserContextData);
  const [loading, setLoading] = useState(true);

  const baseUrl = import.meta.env.VITE_BASE_URL;

  const GetUser = async () => {
    try {
      const res = await axios.get(`${baseUrl}/users/profile`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 201) {
        setuser(res.data.user);
        socket.emit("join", { userType: "user", userId: res.data.user._id });
      } else {
        throw new Error("Unauthorized access");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setuser({
        fullName: {
          firstName: "",
          lastName: "",
        },
        email: "",
      });
      navigate("/userLogin");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/userLogin");
    } else {
      (async () => {
        await GetUser();
      })();
    }
  }, [token, navigate, setuser, socket]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-solid border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-700 text-lg font-semibold">Loading...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default UserProtected;
