import { SignUpFormValues } from "../../../types/signUpFormValues";

export const getInitialValues = (user?: SignUpFormValues | null): SignUpFormValues => ({
  firstName: user?.firstName || "",
  lastName: user?.lastName || "",
  userName: user?.userName || "",
  email: user?.email || "",
  phone: user?.phone || "",
  profileImage: user?.profileImage || "",
  password: "",
  changedDate: new Date(),
  auth: user?.auth || ["read"],
  messages: user?.messages || [],
});
