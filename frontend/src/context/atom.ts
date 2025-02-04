import { atom } from 'recoil';
import { IUser } from '../types/user';

export const currentNameStateState = atom({
  key: 'stateNameState',  
  default: "",        
});

const getInitialAuthState = () => {
  return Boolean(localStorage.getItem("token")); 
};

export const isAuth = atom({
  key: "auth",
  default: getInitialAuthState(), 
});

export const currentUserState = atom<IUser | null>({
  key: "currentUserState",
  default: null, // Start as null before fetching
});