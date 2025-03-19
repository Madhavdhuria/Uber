import { useContext, useEffect, useRef, useState } from "react";
import { CaptainContextdata } from "../context/CaptainContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CaptainDetails from "../../components/CaptainDetails";
import RidePopUp from "../../components/RidePopUp";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePopUp from "../../components/ConfirmRidePopUp";
import { SocketContext } from "../context/SocketContext";

const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
  const [Ride, setRide] = useState(null);
  const { captain, setcaptain } = useContext(CaptainContextdata);
  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();

  const ridePopupPanelRef = useRef(null);
  const confirmRidePopupPanelRef = useRef(null);

  useGSAP(
    function () {
      gsap.to(ridePopupPanelRef.current, {
        transform: ridePopupPanel ? "translateY(0)" : "translateY(100%)",
      });
    },
    [ridePopupPanel]
  );

  useGSAP(
    function () {
      gsap.to(confirmRidePopupPanelRef.current, {
        transform: confirmRidePopupPanel ? "translateY(0)" : "translateY(100%)",
      });
    },
    [confirmRidePopupPanel]
  );

  const GetCaptainDetails = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.status === 201) {
        setcaptain(res.data.captain);
      } else {
        throw new Error("Unauthorized");
      }
    } catch (error) {
      console.error("Error fetching captain details:", error);
      localStorage.removeItem("token");
      navigate("/captainlogin");
    }
  };

  useEffect(() => {
    let locationInterval;

    const start = async () => {
      await GetCaptainDetails();
      if (!captain || !captain._id) return;

      socket.emit("join", {
        userId: captain._id,
        userType: "captain",
      });

      const updateLocation = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            socket.emit("update-location-captain", {
              userId: captain._id,
              location: {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              },
            });
          });
        }
      };

      locationInterval = setInterval(updateLocation, 10000);
      updateLocation();
    };

    start();
    return () => clearInterval(locationInterval);
  }, [captain?._id]);

  const CaptainLogout = async () => {
    try {
      let res = await axios.get(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: true,
      });

      if (res.status === 200) {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setcaptain(null);
        navigate("/captainlogin");
      }
    } catch (err) {
      console.error("Error logging out captain:", err.message);
    }
  };

  const RideAccept = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/Rideaccept`,
        {
          RideId: Ride?._id,
          userId: Ride?.user?.socketId,
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );

      if (res.status === 201) {
        setConfirmRidePopupPanel(true);
      }
    } catch (error) {
      console.error("Error accepting ride:", error.response?.data || error.message);
    }
  };

  socket.on("new-ride", (data) => {
    setRide(data);
    setRidePopupPanel(true);
  });

  return (
    <div className="h-screen">
      <div className="fixed p-6 top-0 flex items-center justify-between w-screen">
        <img
          className="w-16"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber Logo"
        />
        <button onClick={CaptainLogout} className="h-10 w-10 bg-white rounded-full">
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </button>
      </div>

      <div className="h-3/5">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="Map Animation"
        />
      </div>

      <div className="h-2/5 p-4">
        <CaptainDetails />
      </div>

      <div
        ref={ridePopupPanelRef}
        className="fixed w-full z-10 bottom-0 bg-white px-3 py-10 pt-12"
      >
        <RidePopUp
          ride={Ride}
          setRidePopupPanel={setRidePopupPanel}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          RideAccept={RideAccept}
        />
      </div>

      <div
        ref={confirmRidePopupPanelRef}
        className="fixed w-full h-screen z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
      >
        <ConfirmRidePopUp
          ride={Ride}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          setRidePopupPanel={setRidePopupPanel}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
