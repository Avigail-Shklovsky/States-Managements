import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { signIn } from "../services/authApi";

export const useSignInApi = () => {

    
  const queryClient = useQueryClient();

  const handleSignIn = async (userName:string, password:string) => {
    try {
    
        const result = await signIn(userName,password);
        
        if (result.token) toast.success("signed up successfully!");
  
      // Invalidate the query to refresh the states table
      queryClient.invalidateQueries({ queryKey: ["users"] });
    } catch (error) {
      toast.error("Failed to sign in.");
      console.error("Error signing in:", error);
    }
  };

  return {
    handleSignIn,
  };
};
