import axios from "axios";
// import { SignUpFormValues } from "../types/signUpFormValues";
import { IUser } from "../types/user";

export const signUp = async (formData: FormData): Promise<IUser> => {
  const response = await axios.post("http://localhost:5000/auth/signup", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};


export const signIn = async (userName: string, password: string): Promise<IUser> => {
  const response = await axios.post("http://localhost:5000/auth/signin", {
    userName, password
  });
  return response.data;
};
// export const deleteState = async (id: string): Promise<IState[]> => {
//   const response = await axios.delete(`http://localhost:5000/states/${id}`);
//   return response.data;
// };

// export const addState = async (newState: IState): Promise<IState> => {
//   const response = await axios.post("http://localhost:5000/states", newState);
//   return response.data;
// };

// export const updateState = async (updatedState: IState): Promise<IState> => {
//   const response = await axios.put(
//     `http://localhost:5000/states/${updatedState._id}`,
//     updatedState
//   );
//   return response.data;
// };
