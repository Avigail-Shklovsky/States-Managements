// pages/Profile.tsx
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router";
import { Button, Card, CardContent, Typography, Avatar } from "@mui/material";
import { currentUserState } from "../../context/atom";

export default function Profile() {
  const user = useRecoilValue(currentUserState);
  const navigate = useNavigate();

  if (!user) {
    navigate("/signin"); // Redirect to login if not logged in
    return null;
  }

  return (
    <Card sx={{ maxWidth: 400, margin: "auto", mt: 5, p: 2 }}>
      <CardContent>
        <Avatar
           src={`http://localhost:5000/${user.profileImage}`}
          alt={user.firstName}
          sx={{ width: 80, height: 80, margin: "auto" }}
        />
        <Typography variant="h5" textAlign="center" mt={2}>
          {user.firstName}
        </Typography>
        <Typography variant="body1" color="textSecondary" textAlign="center">
          {user.email}
        </Typography>
        <Button fullWidth variant="contained" sx={{ mt: 3 }} onClick={() => navigate("/")}>
          Back to Home
        </Button>
      </CardContent>
    </Card>
  );
}
