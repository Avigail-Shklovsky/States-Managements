import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {Box,CssBaseline,Typography,Drawer,List,ListItem,ListItemText,Container,Button,Avatar,Grid,Paper} from "@mui/material";
import { currentUserState } from "../../context/atom";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "../../services/userApi";
import UserPermissions from "./UserMessagesHistory";
import dayjs from "dayjs";
import SignUpUpdate from "./SignUpUpdate";
import ConfirmModal from "../states/ConfirmModal";
import { useModal } from "../../hooks/useModal";
import PermissionRequestForm from "../permissions/PermissionRequest";
import { useMessages } from "../../hooks/messages/useMessages";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
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
    <div>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Drawer
          variant="permanent"
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
            <ListItem
              component="button"
              sx={{ backgroundColor: "white", border: "none" }}
              onClick={() => handleMenuClick("profile")}
            >
              <ListItemText primary="Profile" />
            </ListItem>
            <ListItem
              component="button"
              sx={{ backgroundColor: "white", border: "none" }}
              onClick={() => {
                handleMenuClick("edit-profile");
              }}
            >
              <ListItemText primary="Edit profile" />{" "}
            </ListItem>

            <ListItem
              component="button"
              sx={{ backgroundColor: "white", border: "none" }}
              onClick={() => handleMenuClick("permissions")}
            >
              <ListItemText primary="Permissions" />
            </ListItem>

            <ListItem
              component="button"
              sx={{ backgroundColor: "white", border: "none" }}
              onClick={() => handleMenuClick("permission-form")}
            >
              <ListItemText primary="Permissions Request Form" />
            </ListItem>
          </List>
        </Drawer>

        <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
          {currentPage === "profile" && (
            <Container>
              <Grid container spacing={4} justifyContent="center">
                <Grid item xs={12} sm={8} md={6}>
                  <Paper
                    sx={{
                      padding: 3,
                      boxShadow: 3,
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <Box sx={{ textAlign: "center" }}>
                      <Avatar
                        src={`http://localhost:5000/${user.profileImage}`}
                        alt={user.firstName}
                        sx={{ width: 120, height: 120, margin: "auto" }}
                      />
                      <Typography
                        variant="h5"
                        sx={{ mt: 2, fontWeight: "bold" }}
                      >
                        {user.firstName} {user.lastName}
                      </Typography>
                      <Typography
                        variant="body1"
                        color="textSecondary"
                        sx={{ mt: 1 }}
                      >
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
                          onClick={() => {
                            navigate("/admin-dashboard");
                          }}
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
          )}

          {currentPage === "permissions" && (
            <Container>
              <Paper
                sx={{ padding: 3, boxShadow: 3, backgroundColor: "#ffffff" }}
              >
                <UserPermissions userId={user._id.toString()} />
              </Paper>
            </Container>
          )}

          {currentPage === "permission-form" && (
            <PermissionRequestForm></PermissionRequestForm>
          )}

          {currentPage === "edit-profile" && (
            <Container>
              <SignUpUpdate
                mode="edit"
                user={user}
                userId={user._id.toString()}
              />
            </Container>
          )}
        </Box>
      </Box>
      <ConfirmModal
        type="delete"
        open={isModalOpen}
        onClose={closeModal}
        onConfirm={() => {
          handleDeleteUser();
          closeModal();
        }}
      />
    </div>
  );
};

export default Profile;
