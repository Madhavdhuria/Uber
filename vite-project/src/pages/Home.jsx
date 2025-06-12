import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import Locationsearchpanel from "../../components/Locationsearchpanel";
import VehiclePanel from "../../components/VehiclePanel";
import ConfirmRidePanel from "../../components/ConfirmRidePanel";
import LookingForDriver from "../../components/LookingForDriver";
import WaitingForDriver from "../../components/WaitingForDriver";
import { useContext } from "react";
import { SocketContext } from "../context/SocketContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MapView from "./Mapview";
import "../leafletIconFix"


const Home = () => {
  const [pickup, setpickup] = useState("");
  const [destination, setdestination] = useState("");
  const [activeInput, setActiveInput] = useState("");
  const [OpenPanel, setOpenPanel] = useState(false);
  const [vehiclepanel, setvehiclepanel] = useState(false);
  const [confirmridePanel, setconfirmridePanel] = useState(false);
  const [VehicleFound, setVehicleFound] = useState(false);
  const [WaitngForDriver, setWaitngForDriver] = useState(false);
  const [fares, setfares] = useState({});
  const [selectedVehicle, setselectedVehicle] = useState();
  const [Ride, setRide] = useState();

  const panelRef = useRef(null);
  const arrowref = useRef(null);
  const vehicleRef = useRef(null);
  const ConfirmRideref = useRef(null);
  const VehicleFoundRef = useRef(null);
  const WaitngForDriverref = useRef(null);

  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("token");

  socket.on("ride-accept", (data) => {
    setRide(data);
    setVehicleFound(false);
    setWaitngForDriver(true);
  });

  socket.on("start-ride", (data) => {
    navigate("/riding", { state: { ride: data } });
  });

  const submitHandler = async () => {
    const res = await axios.get(`${baseUrl}/rides/get-fares`, {
      params: { pickUp: pickup, destination: destination },
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 201) {
      setfares(res.data.fares);
      setvehiclepanel(true);
      setOpenPanel(false);
    } else {
      alert("something is up with server");
    }
  };

  const CreateRide = async () => {
    const res = await axios.post(
      `${baseUrl}/rides/create`,
      {
        pickUp: pickup,
        destination: destination,
        vehicleType: selectedVehicle,
      },
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.status === 201) {
      console.log(res.data);
    } else {
      alert("something is up with server");
    }
  };

  useGSAP(() => {
    gsap.to(panelRef.current, {
      height: OpenPanel ? "60%" : "0%",
      overflow: OpenPanel ? "auto" : "hidden",
    });
    gsap.to(arrowref.current, {
      opacity: OpenPanel ? 1 : 0,
    });
  }, [OpenPanel]);

  useGSAP(() => {
    gsap.to(vehicleRef.current, {
      transform: vehiclepanel ? "translateY(0)" : "translateY(100%)",
    });
  }, [vehiclepanel]);

  useGSAP(() => {
    gsap.to(ConfirmRideref.current, {
      transform: confirmridePanel ? "translateY(0)" : "translateY(100%)",
    });
  }, [confirmridePanel]);

  useGSAP(() => {
    gsap.to(VehicleFoundRef.current, {
      transform: VehicleFound ? "translateY(0)" : "translateY(100%)",
    });
  }, [VehicleFound]);

  useGSAP(() => {
    gsap.to(WaitngForDriverref.current, {
      transform: WaitngForDriver ? "translateY(0)" : "translateY(100%)",
    });
  }, [WaitngForDriver]);

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-gray-50">
      <img
        className="w-16 absolute left-5 top-5"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="Uber Logo"
      />

      {/* MapView with z-0 */}
      <div className="h-full w-full absolute top-0 left-0 z-0">
        <MapView />
      </div>

      {/* Panels wrapper: pointer-events-none allows map below to be clickable */}
      <div className="flex flex-col justify-end h-screen absolute top-0 w-full pointer-events-none">

        {/* Form Panel */}
        <div className="h-[40%] p-6 bg-white relative pointer-events-auto">
          <h5
            ref={arrowref}
            onClick={() => setOpenPanel(false)}
            className="absolute opacity-0 right-6 top-6 text-2xl cursor-pointer"
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="text-2xl font-semibold">Find a trip</h4>
          <form>
            <input
              value={pickup}
              onClick={() => {
                setOpenPanel(true);
                setActiveInput("pickup");
              }}
              onChange={(e) => setpickup(e.target.value)}
              className="bg-gray-200 px-12 py-2 text-base rounded-lg w-full mb-3 mt-5"
              type="text"
              placeholder="Enter your pickup location"
            />
            <input
              value={destination}
              onClick={() => {
                setOpenPanel(true);
                setActiveInput("destination");
              }}
              onChange={(e) => setdestination(e.target.value)}
              className="bg-gray-200 px-12 py-2 text-base rounded-lg w-full"
              type="text"
              placeholder="Enter your drop location"
            />
          </form>
          <button
            onClick={submitHandler}
            className="focus:outline-none text-white w-full mt-4 bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Find a Trip
          </button>
        </div>

        {/* Location Search Panel */}
        <div ref={panelRef} className="bg-white h-0 transition-all pointer-events-auto">
          <Locationsearchpanel
            setOpenPanel={setOpenPanel}
            setVehiclePanel={setvehiclepanel}
            pickup={pickup}
            setPickup={setpickup}
            destination={destination}
            setDestination={setdestination}
            activeInput={activeInput}
          />
        </div>

        {/* Vehicle Panel */}
        <div
          ref={vehicleRef}
          className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12 pointer-events-auto"
        >
          <VehiclePanel
            setConfirmRidePanel={setconfirmridePanel}
            setVehiclePanel={setvehiclepanel}
            fares={fares}
            setselectedVehicle={setselectedVehicle}
          />
        </div>

        {/* Confirm Ride Panel */}
        <div
          ref={ConfirmRideref}
          className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12 pointer-events-auto"
        >
          <ConfirmRidePanel
            pickUp={pickup}
            destination={destination}
            setconfirmridePanel={setconfirmridePanel}
            setVehiclePanel={setvehiclepanel}
            setVehicleFound={setVehicleFound}
            fares={fares}
            selectedVehicle={selectedVehicle}
            CreateRide={CreateRide}
          />
        </div>

        {/* Looking For Driver */}
        <div
          ref={VehicleFoundRef}
          className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12 pointer-events-auto"
        >
          <LookingForDriver
            setVehicleFound={setVehicleFound}
            pickup={pickup}
            destination={destination}
            selectedVehicle={selectedVehicle}
            fares={fares}
          />
        </div>

        {/* Waiting For Driver */}
        <div
          ref={WaitngForDriverref}
          className="fixed w-full z-10 bottom-0 bg-white px-3 py-6 pt-12 pointer-events-auto"
        >
          <WaitingForDriver
            Ride={Ride}
            setWaitngForDriver={setWaitngForDriver}
          />
        </div>
      </div>
    </main>
  );
};

export default Home;
