import {
  Box,
  Avatar,
  Typography,
  Paper,
  Container,
  Button,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { IUser } from "../../../types/user";

interface UserProfileProps {
  user: IUser;
  isAdmin: boolean;
  openModal: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({
  user,
  isAdmin,
  openModal,
}) => {
  const navigate = useNavigate();

  return (
    <Container>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={8} md={6}>
          <Paper sx={{ padding: 3, boxShadow: 3, backgroundColor: "#ffffff" }}>
            <Box sx={{ textAlign: "center" }}>
              <Avatar
                src={`http://localhost:5000/${user.profileImage}`}
                alt={user.firstName}
                sx={{ width: 120, height: 120, margin: "auto" }}
              />
              <Typography variant="h5" sx={{ mt: 2, fontWeight: "bold" }}>
                {user.firstName} {user.lastName}
              </Typography>
              <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
                {user.email}
                <br />
                {user.phone}
                <br />
                Last profile update:{" "}
                {dayjs(user.changedDate).format("MMMM D, YYYY")}
              </Typography>
            </Box>
            <Box sx={{ mt: 3 }}>
              {isAdmin && (
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ mb: 2 }}
                  onClick={() => navigate("/admin-dashboard")}
                >
                  Admin Dashboard
                </Button>
              )}
              <Button
                variant="outlined"
                color="error"
                fullWidth
                sx={{ mb: 2 }}
                onClick={openModal}
              >
                Delete Profile
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserProfile;
