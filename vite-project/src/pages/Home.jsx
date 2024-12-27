import { useContext, useEffect, useRef, useState } from "react";
import { UserContextData } from "../context/userContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import Locationsearchpanel from "../../components/Locationsearchpanel";
import VehiclePanel from "../../components/VehiclePanel";
import ConfirmRidePanel from "../../components/ConfirmRidePanel";
import LookingForDriver from "../../components/LookingForDriver";
import WaitingForDriver from "../../components/WaitingFordriver";

const Home = () => {
  const navigate = useNavigate();
  const { user, setuser } = useContext(UserContextData);
  const [error, setError] = useState("");
  const [pickup, setpickup] = useState("");
  const [destination, setdestination] = useState("");
  const [OpenPanel, setOpenPanel] = useState(false);
  const [vehiclepanel, setvehiclepanel] = useState(false);
  const [confirmridePanel, setconfirmridePanel] = useState(false);
  const [VehicleFound, setVehicleFound] = useState(false);
  const [WaitngForDriver, setWaitngForDriver] = useState(false);

  const panelRef = useRef(null);
  const arrowref = useRef(null);
  const vehicleRef = useRef(null);
  const ConfirmRideref = useRef(null);
  const VehicleFoundRef = useRef(null);
  const WaitngForDriverref = useRef(null);

  let getDetails = async () => {
    try {
      let res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/users/profile`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );

      setuser(res.data.user);
      setError("");
    } catch (err) {
      if (err.response) {
        if (err.response.data.message === "UnAuthorized") {
          localStorage.removeItem("token");
          navigate("/userlogin");
        }
        setError(err.response.data.message || "Failed to fetch user profile");
      } else if (err.request) {
        setError("No response from the server. Please try again later.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
      console.error("Error fetching user details:", err.message);
    }
  };

  useEffect(() => {
    if (user.email === "") {
      getDetails();
    }
  });

  const submitHandler = (e) => {
    e.preventDefault();
  };

  useGSAP(
    function () {
      if (OpenPanel) {
        gsap.to(panelRef.current, {
          height: "70%",
        });
        gsap.to(arrowref.current, {
          opacity: "1",
        });
      } else {
        gsap.to(panelRef.current, {
          height: "0%",
        });
        gsap.to(arrowref.current, {
          opacity: "0",
        });
      }
    },
    [OpenPanel]
  );

  useGSAP(
    function () {
      if (vehiclepanel) {
        gsap.to(vehicleRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehicleRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehiclepanel]
  );

  useGSAP(
    function () {
      if (confirmridePanel) {
        gsap.to(ConfirmRideref.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(ConfirmRideref.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmridePanel]
  );
  useGSAP(
    function () {
      if (VehicleFound) {
        gsap.to(VehicleFoundRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(VehicleFoundRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [VehicleFound]
  );
  useGSAP(
    function () {
      if (WaitngForDriver) {
        gsap.to(WaitngForDriverref.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(WaitngForDriverref.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [WaitngForDriver]
  );

  return (
    <div>
      {error ? (
        <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>
      ) : (
        <main className="relative h-screen w-screen overflow-hidden">
          <img
            className="w-16 absolute left-5 top-5"
            src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
            alt=""
          />
          <div className="h-screen w-screen">
            <img
              className="h-full w-full object-cover"
              src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
              alt=""
            />
          </div>
          <div className="flex flex-col justify-end h-screen absolute top-0 w-full">
            <div className="h-[30%] p-6 bg-white relative">
              <h5
                ref={arrowref}
                onClick={() => {
                  setOpenPanel(false);
                }}
                className="absolute opacity-0 right-6 top-6 text-2xl"
              >
                <i className="ri-arrow-down-wide-line"></i>
              </h5>
              <h4 className="text-2xl font-semibold">Find a trip</h4>
              <form
                onSubmit={(e) => {
                  submitHandler(e);
                }}
              >
                <input
                  value={pickup}
                  onClick={() => {
                    setOpenPanel(true);
                  }}
                  onChange={(e) => {
                    setpickup(e.target.value);
                  }}
                  className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mb-3 mt-5"
                  type="text"
                  placeholder="Enter your pickup Location"
                />
                <input
                  value={destination}
                  onClick={() => {
                    setOpenPanel(true);
                  }}
                  onChange={(e) => {
                    setdestination(e.target.value);
                  }}
                  className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full"
                  type="text"
                  placeholder="Enter your Drop Location"
                />
              </form>
            </div>
            <div ref={panelRef} className=" bg-white h-0">
              <Locationsearchpanel
                setOpenPanel={setOpenPanel}
                setvehiclepanel={setvehiclepanel}
              ></Locationsearchpanel>
            </div>

            <div
              ref={vehicleRef}
              className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
            >
              <VehiclePanel
                setConfirmRidePanel={setconfirmridePanel}
                setVehiclePanel={setvehiclepanel}
              />
            </div>

            <div
              ref={ConfirmRideref}
              className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
            >
              <ConfirmRidePanel
                setconfirmridePanel={setconfirmridePanel}
                setVehiclePanel={setvehiclepanel}
                setVehicleFound={setVehicleFound}
              />
            </div>
            <div
              ref={VehicleFoundRef}
              className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12"
            >
              <LookingForDriver setVehicleFound={setVehicleFound} />
            </div>
            <div
              className="fixed w-full z-10 bottom-0  bg-white px-3 py-6 pt-12"
              ref={WaitngForDriverref}
            >
              <WaitingForDriver setWaitngForDriver={setWaitngForDriver} />
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

export default Home;
