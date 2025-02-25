// import { useNavigate } from "react-router-dom";
// import { useSignUpApi } from "../../../hooks/auth/useSignUpApi";
// import { useUpdateProfileApi } from "../../../hooks/users/useUpdateProfileApi";
// import { useAuth } from "../../../hooks/auth/useAuth";
// import { SignUpFormValues } from "../../../types/signUpFormValues"; 
// type Mode = "signup" | "edit";

// export const handleSubmit = async (values: SignUpFormValues, mode: Mode, userId: string) => {
//   const navigate = useNavigate();
//   const { mutate: handleSignUp } = useSignUpApi();
//   const { mutate: handleUpdateProfile } = useUpdateProfileApi();
//   const { handleUserLocalStorage } = useAuth();

//   const formData = new FormData();
//   Object.entries(values).forEach(([key, value]) => {
//     if (key === "profileImage" && value instanceof File) {
//       formData.append(key, value);
//     } else {
//       formData.append(key, value.toString());
//     }
//   });

//   if (mode === "signup") {
//     console.log(values,"fropm sign up handke hook"
//     );
    
//     handleSignUp(formData, { 
//       onSuccess: (response) => { 
//         handleUserLocalStorage(response.user); 
//         navigate("/"); 
//       } 
//     });
//   } else {
//     handleUpdateProfile({ userId, formData }, { onSuccess: () => navigate(-1) });
//   }
// };

