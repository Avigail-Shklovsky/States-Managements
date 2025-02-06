import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardContent, Typography, Avatar } from "@mui/material";
import { currentUserState } from "../../context/atom";
import dayjs from "dayjs";
import { SignUpFormValues } from "../../types/signUpFormValues";

export default function Profile() {
  const user = useRecoilValue(currentUserState);
  const navigate = useNavigate();

  if (!user) {
    navigate("/signin");
    return null;
  }
  const handleEditProfile = () => {
   const userToSend = {
     firstName: user.firstName,
     lastName: user.lastName,
     userName: user.userName,
     email: user.email,
     phone: user.phone,
     profileImage: user.profileImage,
     changedDate: new Date(),
     auth: user.auth,
     password: user.password, 
   } as unknown as SignUpFormValues
   
   navigate("/edit-profile", { state: { mode: "edit", user: userToSend, userid:user._id.toString() } });
   

  };
  return (
    <Card sx={{ maxWidth: 400, margin: "auto", mt: 5, p: 2 }}>
      <CardContent>
        <Avatar
           src={`http://localhost:5000/${user.profileImage}`}
          alt={user.firstName}
          sx={{ width: 80, height: 80, margin: "auto" }}
        />
        <Typography variant="h5" fontWeight={"medium-bold"} textAlign="center" mt={2}>
          {user.firstName} {user.lastName}
        </Typography>
        <Typography variant="body1" color="textSecondary" textAlign="center">
          {user.email}
          <br />
          {user.phone}
          <br />
      Last profile update:    {dayjs(user.changedDate).format(" MMMM D, YYYY")}
        </Typography>
        <Button fullWidth variant="contained" sx={{ mt: 3 }} onClick={handleEditProfile}>
          Edit Profile
        </Button>
      </CardContent>
    </Card>
  );
}
    