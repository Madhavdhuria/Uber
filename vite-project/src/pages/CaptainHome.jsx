import { useContext, useRef, useState } from "react";
import { captainContextdata } from "../context/CaptainContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CaptainDetails from "../../components/CaptainDetails";
import RidePopUp from "../../components/RidePopUp";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePopUp from "../../components/ConfirmRidePopUp";

const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(true);
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);

  const ridePopupPanelRef = useRef(null);
  const confirmRidePopupPanelRef = useRef(null);

  useGSAP(
    function () {
      if (ridePopupPanel) {
        gsap.to(ridePopupPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(ridePopupPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [ridePopupPanel]
  );

  useGSAP(
    function () {
      if (confirmRidePopupPanel) {
        gsap.to(confirmRidePopupPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmRidePopupPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePopupPanel]
  );

  const navigate = useNavigate();
  const { setcaptain } = useContext(captainContextdata);
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
      console.error("Error logging out captain:", err.message);
    }
  };
  return (
    <div className="h-screen">
      <div className="fixed p-6 top-0 flex items-center justify-between w-screen">
        <img
          className="w-16"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <button
          onClick={() => {
            CaptainLogout();
          }}
          to="/home"
          className="h-10 w-10 bg-white rounded-full"
        >
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </button>
      </div>
      <div className="h-3/5">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>
      <div className="h-2/5 p-4">
        <CaptainDetails />
      </div>
      <div
        ref={ridePopupPanelRef}
        className="fixed w-full z-10 bottom-0  bg-white px-3 py-10 pt-12"
      >
        <RidePopUp
          setRidePopupPanel={setRidePopupPanel}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
        />
      </div>
      <div
        ref={confirmRidePopupPanelRef}
        className="fixed w-full h-screen z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
      >
        <ConfirmRidePopUp
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          setRidePopupPanel={setRidePopupPanel}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
