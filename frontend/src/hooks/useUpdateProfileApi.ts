import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateProfile } from "../services/userApi";
import { useRecoilState } from "recoil";
import { currentUserState } from "../context/atom";

export const useUpdateProfileApi = () => {

    const [, setUser] = useRecoilState(currentUserState);
  
  // Use mutateAsync to directly call the mutation in async functions
  const mutation = useMutation({
    mutationFn: ({ userId, formData }: { userId: string; formData: FormData }) =>
      updateProfile(userId, formData),
    onSuccess: (data) => {
      if (data?._id) {
        setUser(data)
        localStorage.setItem("user", JSON.stringify(data));

        toast.success("Profile updated successfully!");
      }
    },
    onError: () => {
      toast.error("Failed to update profile.");
    },
  });

  return mutation;
};
