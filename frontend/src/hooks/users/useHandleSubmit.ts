import { useNavigate } from "react-router-dom";
import { useSignUpApi } from "../auth/useSignUpApi";
import { useUpdateProfileApi } from "./useUpdateProfileApi";
import { useAuth } from "../auth/useAuth";
import { SignUpFormValues } from "../../types/signUpFormValues";


type Mode = "signup" | "edit";

export const useHandleSubmit = () => {
  const navigate = useNavigate();
  const { mutate: handleSignUp } = useSignUpApi();
  const { mutate: handleUpdateProfile } = useUpdateProfileApi();
  const { handleUserLocalStorage } = useAuth();

  return async (values: SignUpFormValues, mode: Mode, userId: string) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (key === "profileImage" && value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, value.toString());
      }
    });

    if (mode === "signup") {
      console.log(values, "from sign up handle hook");

      handleSignUp(formData, {
        onSuccess: (response) => {
          handleUserLocalStorage(response.user);
          navigate("/");
        },
      });
    } else {
      handleUpdateProfile({ userId, formData }, { onSuccess: () => navigate(-1) });
    }
  };
};
