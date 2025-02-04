// hooks/useAuth.ts
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { currentUserState } from "../context/atom";

export function useAuth() {
  const [user, setUser] = useRecoilState(currentUserState);

  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser)); // Restore user from localStorage
      } else {
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  const handleLoginLocalStorage = (userData: any) => {
    console.log(userData);
    
    localStorage.setItem("user", JSON.stringify(userData.user)); // Save session
    setUser(userData.user);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return { user, handleLoginLocalStorage, logout };
}
