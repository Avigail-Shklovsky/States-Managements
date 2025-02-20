import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { currentUserState } from "../../context/atom";

export function useAuth() {
  const [user, setUser] = useRecoilState(currentUserState);

  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  const handleLoginLocalStorage = (userData: any) => {
    localStorage.setItem("user", JSON.stringify(userData.user)); 
    setUser(userData.user);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return { user, handleLoginLocalStorage, logout };
}
