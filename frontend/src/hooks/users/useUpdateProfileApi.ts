import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useRecoilState } from "recoil";
import { updateProfile } from "../../services/api/userApi";
import { currentUserState } from "../../context/atom";

export const useUpdateProfileApi = () => {
  const [, setUser] = useRecoilState(currentUserState);

  const mutation = useMutation({
    mutationFn: ({
      userId,
      formData,
    }: {
      userId: string;
      formData: FormData;
    }) => updateProfile(userId, formData),
    onSuccess: (data) => {
      if (data?._id) {
        setUser(data);
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
