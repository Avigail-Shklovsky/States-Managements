import SignUpUpdateForm from "../forms/SignUpUpdateForm";
import { Typography } from "@mui/material";
import { currentUserState } from "../../../context/atom";
import { useRecoilValue } from "recoil";

const SignUpUpdate: React.FC<{ mode: "signup" | "edit" }> = ({ mode }) => {
  const initialUser = useRecoilValue(currentUserState);

  return (
    <div className="container">
      <div className="formWrapper">
        <Typography
          variant="h4"
          className="title"
          gutterBottom
          sx={{ textAlign: "center" }}
        >
          {mode === "signup" ? "Sign Up" : "Edit Profile"}
        </Typography>
        <SignUpUpdateForm
          mode={mode}
          user={initialUser}
          userId={initialUser?._id.toString()}
        />
      </div>
    </div>
  );
};

export default SignUpUpdate;
