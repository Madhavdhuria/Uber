import { createContext, useState } from "react";



export const CaptainContextdata = createContext();
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
  _id:null
};

const CaptainContext = ({ children }) => {
  const [captain, setcaptain] = useState(initialCaptainState);
  

  return (
    <CaptainContextdata.Provider
      value={{ captain, setcaptain }}
    >
      {children}
    </CaptainContextdata.Provider>
  );
};

export default CaptainContext;
