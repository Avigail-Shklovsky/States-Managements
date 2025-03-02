import { useMutation } from "@tanstack/react-query";
import { sendResetEmail } from "../../services/api/authApi";

export const useForgotPasswordApi = () => 
  useMutation({
    mutationFn: sendResetEmail,
    onSuccess: (data) => console.log("Reset email sent successfully:", data),
    onError: (error) => console.error("Error sending reset email:", error),
  });
