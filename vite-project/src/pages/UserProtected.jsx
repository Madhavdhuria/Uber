import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const UserProtected = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {  
    if (!token) {
      navigate("/userLogin");
    }
  }, [token, navigate]);

  return <div>{children}</div>;
};

export default UserProtected;
