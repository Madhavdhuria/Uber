import { createContext, useState } from "react";



export const captainContextdata = createContext();
const initialCaptainState = {
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
};

const CaptainContext = ({ children }) => {
  const [captain, setcaptain] = useState(initialCaptainState);
  

  return (
    <captainContextdata.Provider
      value={{ captain, setcaptain }}
    >
      {children}
    </captainContextdata.Provider>
  );
};

export default CaptainContext;
