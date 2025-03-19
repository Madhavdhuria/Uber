import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { CaptainContextdata } from "../context/CaptainContext";
import { SocketContext } from "../context/SocketContext";

const CaptainProtected = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { setcaptain } = useContext(CaptainContextdata);
  const { socket } = useContext(SocketContext);
  const [loading, setLoading] = useState(true);

  const GetCaptainDetails = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 201) {
        setcaptain(res.data.captain);
        socket.emit("join", { userId: res.data.captain._id, userType: "captain" });
      } else {
        throw new Error("Unauthorized");
      }
    } catch (error) {
      console.error("Captain authentication failed:", error);
      localStorage.removeItem("token");
      navigate("/captainLogin");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/captainLogin");
      setLoading(false);
    } else {
      GetCaptainDetails();
    }
  }, [token, navigate]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-gray-300 border-t-black rounded-full"></div>
      </div>
    );
  }

  return <>{children}</>;
};

export default CaptainProtected;
