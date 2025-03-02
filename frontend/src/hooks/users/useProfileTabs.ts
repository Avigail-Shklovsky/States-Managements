import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const useProfileTabs = () => {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState("profile");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get("tab");
    if (tab) setCurrentPage(tab);
  }, [location.search]);

  return { currentPage, setCurrentPage };
};

export default useProfileTabs;
