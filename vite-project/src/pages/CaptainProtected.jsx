import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const CaptainProtected = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {  
    if (!token) {
      navigate("/captainLogin");
    }
  }, [token, navigate]);

  return <div>{children}</div>;
};

export default CaptainProtected;
