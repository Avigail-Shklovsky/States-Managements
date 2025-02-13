import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useAdminAuth = (redirectOnFail = true) => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");

    if (user && user.email === "9013825@gmail.com") {
      setIsAdmin(true);
    } else if (redirectOnFail) {
      navigate("/unauthorized");
    }
  }, [navigate, redirectOnFail]);
  return isAdmin;
};

export default useAdminAuth;
