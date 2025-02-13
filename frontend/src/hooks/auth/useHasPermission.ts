import { useRecoilValue } from "recoil";
import { currentUserState } from "../../context/atom";

const useHasPermission = (permission: string): boolean => {
  const currentUser = useRecoilValue(currentUserState);
  const userAuth = currentUser?.auth || [];
  return userAuth.includes(permission);
};

export default useHasPermission;
