import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import Locationsearchpanel from "../../components/Locationsearchpanel";
import VehiclePanel from "../../components/VehiclePanel";
import ConfirmRidePanel from "../../components/ConfirmRidePanel";
import LookingForDriver from "../../components/LookingForDriver";
import WaitingForDriver from "../../components/WaitingFordriver";

const Home = () => {
  const [pickup, setpickup] = useState("");
  const [destination, setdestination] = useState("");
  const [OpenPanel, setOpenPanel] = useState(false);
  const [vehiclepanel, setvehiclepanel] = useState(false);
  const [confirmridePanel, setconfirmridePanel] = useState(false);
  const [VehicleFound, setVehicleFound] = useState(false);
  const [WaitngForDriver, setWaitngForDriver] = useState(true);

  const panelRef = useRef(null);
  const arrowref = useRef(null);
  const vehicleRef = useRef(null);
  const ConfirmRideref = useRef(null);
  const VehicleFoundRef = useRef(null);
  const WaitngForDriverref = useRef(null);

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
    <main className="relative h-screen w-screen overflow-hidden bg-gray-50">
      <img
        className="w-16 absolute left-5 top-5"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="Uber Logo"
      />
      <div className="h-screen w-screen">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="Background"
        />
      </div>
      <div className="flex flex-col justify-end h-screen absolute top-0 w-full">
        <div className="h-[30%] p-6 bg-white relative">
          <h5
            ref={arrowref}
            onClick={() => setOpenPanel(false)}
            className="absolute opacity-0 right-6 top-6 text-2xl cursor-pointer"
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="text-2xl font-semibold">Find a trip</h4>
          <form onSubmit={submitHandler}>
            <input
              value={pickup}
              onClick={() => setOpenPanel(true)}
              onChange={(e) => setpickup(e.target.value)}
              className="bg-gray-200 px-12 py-2 text-base rounded-lg w-full mb-3 mt-5"
              type="text"
              placeholder="Enter your pickup location"
            />
            <input
              value={destination}
              onClick={() => setOpenPanel(true)}
              onChange={(e) => setdestination(e.target.value)}
              className="bg-gray-200 px-12 py-2 text-base rounded-lg w-full"
              type="text"
              placeholder="Enter your drop location"
            />
          </form>
        </div>

        <div ref={panelRef} className="bg-white h-0 transition-all">
          <Locationsearchpanel
            setOpenPanel={setOpenPanel}
            setvehiclepanel={setvehiclepanel}
          />
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
          ref={WaitngForDriverref}
          className="fixed w-full z-10 bottom-0 bg-white px-3 py-6 pt-12"
        >
          <WaitingForDriver setWaitngForDriver={setWaitngForDriver} />
        </div>
      </div>
    </main>
  );
};

export default Home;
