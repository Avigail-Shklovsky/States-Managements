import { useState, useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  Box,
  CssBaseline,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Container,
  Button,
  Avatar,
  Grid,
  Paper,
  useMediaQuery,
  useTheme,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { currentUserState } from "../../context/atom";
import { useNavigate, useLocation } from "react-router-dom";
import { deleteUser } from "../../services/userApi";
import UserPermissions from "./UserMessagesHistory";
import dayjs from "dayjs";
import SignUpUpdate from "./SignUpUpdate";
import ConfirmModal from "../states/ConfirmModal";
import { useModal } from "../../hooks/useModal";
import PermissionRequestForm from "../permissions/PermissionRequest";
import { useMessages } from "../../hooks/messages/useMessages";
import useAdminAuth from "../../hooks/auth/useAdminAuth";

const drawerWidth = 240;

const Profile = () => {
  const user = useRecoilValue(currentUserState);
  const setUser = useSetRecoilState(currentUserState);
  const navigate = useNavigate();
  const { isModalOpen, openModal, closeModal } = useModal();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState<string>("profile");
  const isAdmin = useAdminAuth(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get("tab");
    if (tab) {
      setCurrentPage(tab);
    }
  }, [location.search]);
  useMessages();

  const handleMenuClick = (page: string) => {
    setCurrentPage(page);
    setMobileOpen(false);
  };

  const handleDeleteUser = async () => {
    openModal();
    if (user) {
      await deleteUser(user._id.toString());
      setUser(null);
      navigate("/signin");
    }
  };

  if (!user) {
    navigate("/signin");
    return null;
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {isMobile && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={() => setMobileOpen(!mobileOpen)}
          sx={{ position: "absolute", top: 16, left: 16,  color:'white'}}
        >
          <MenuIcon />
        </IconButton>
      )}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            mt: 8,
          },
        }}
      >
        <List>
          {[
            { label: "Profile", key: "profile" },
            { label: "Edit Profile", key: "edit-profile" },
            { label: "Permissions", key: "permissions" },
            { label: "Permissions Request Form", key: "permission-form" },
          ].map((item) => (
            <ListItem
              key={item.key}
              component="button"
              sx={{ backgroundColor: "white", border: "none" }}
              onClick={() => handleMenuClick(item.key)}
            >
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        {currentPage === "profile" && (
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
                      Last profile update: {dayjs(user.changedDate).format("MMMM D, YYYY")}
                    </Typography>
                  </Box>
                  <Box sx={{ mt: 3 }}>
                    {isAdmin && (
                      <Button variant="contained" fullWidth sx={{ mb: 2 }} onClick={() => navigate("/admin-dashboard")}>
                        Admin Dashboard
                      </Button>
                    )}
                    <Button variant="outlined" color="error" fullWidth sx={{ mb: 2 }} onClick={openModal}>
                      Delete Profile
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        )}
        {currentPage === "permissions" && (
          <Container>
            <Paper sx={{ padding: 3, boxShadow: 3, backgroundColor: "#ffffff", width:"80%" }}>
              <UserPermissions userId={user._id.toString()} />
            </Paper>
          </Container>
        )}
        {currentPage === "permission-form" && <PermissionRequestForm />}
        {currentPage === "edit-profile" && (
          <Container>
            <SignUpUpdate mode="edit" user={user} userId={user._id.toString()} />
          </Container>
        )}
      </Box>
      <ConfirmModal type="delete" open={isModalOpen} onClose={closeModal} onConfirm={handleDeleteUser} />
    </Box>
  );
};

export default Profile;
