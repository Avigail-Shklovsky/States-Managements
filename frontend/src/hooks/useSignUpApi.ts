// import { useQueryClient } from "@tanstack/react-query";
// import toast from "react-hot-toast";
// // import { SignUpFormValues } from "../types/signUpFormValues";
// import { signUp } from "../services/authApi";

// export const useSignUpApi = (id: string | undefined) => {
//     console.log(id);
    
//   const queryClient = useQueryClient();

//   const handleSignUp = async (formData:FormData) => {
//     try {
//     //   if (id) {
//         // await updateState({ ...values, _id: id } as unknown as SignUpFormValues);
//         // toast.success("State updated successfully!");
//     //   } else {
//         const result = await signUp(formData);
//         // console.log( ,"from use sign up api");
        
//         if (result.user._id) toast.success("signed up successfully!");
//     //   }

//       // Invalidate the query to refresh the states table
//       queryClient.invalidateQueries({ queryKey: ["users"] });
//       return result;
//     } catch (error) {
//       toast.error("Failed to sign up.");
//       console.error("Error signing up:", error);
//     }
//   };

//   return {
//     handleSignUp,
//   };
// };

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { signUp } from "../services/authApi";

export const useSignUpApi = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      if (data?.user?._id) {
        toast.success("Signed up successfully!");
        queryClient.invalidateQueries({ queryKey: ["users"] });
      }
    },
    onError: () => {
      toast.error("Failed to sign up.");
    },
  });

  return mutation; // returns mutate, isPending, isSuccess, error, etc.
};
