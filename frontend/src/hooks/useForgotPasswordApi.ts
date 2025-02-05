// import { useMutation } from "@tanstack/react-query";
// import axios from "axios";

// export const useForgotPasswordApi = () => {
//   return useMutation(
//     async (data: { email: string }) => {
//       return axios.post("/auth/forgot-password", data);
//     },
//     {
//       onSuccess: () => {
//         // Do something on success, like showing a success message
//       },
//       onError: (error: any) => {
//         // Handle error
//         console.error("Error sending reset link:", error);
//       }
//     }
//   );
// };



import { useMutation } from '@tanstack/react-query';
import { sendResetEmail } from '../services/authApi';



export const useForgotPasswordApi = () => {
  const mutation = useMutation({
    mutationFn: sendResetEmail, // Pass the function here
    onSuccess: (data) => {
      console.log('Reset email sent successfully:', data);
    },
    onError: (error) => {
      console.error('Error sending reset email:', error);
    },
  });

  return (
    mutation);

};