import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAdminAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    
    if (!user || user.email !== "9013825@gmail.com") {
      navigate("/unauthorized");
    }
  }, [navigate]);
};

export default useAdminAuth;
