// import { useNavigate } from "react-router-dom";
// import { Button, Card, CardContent, Typography, Avatar } from "@mui/material";
// import { currentUserState } from "../../context/atom";
// import dayjs from "dayjs";
// import { SignUpFormValues } from "../../types/signUpFormValues";
// import { useMutation } from "@tanstack/react-query";
// import { deleteUser } from "../../services/userApi";
// import { useRecoilValue, useSetRecoilState } from "recoil";
// import UserPermissions from "./UserMessagesHistory";

// export default function Profile() {
//   const user = useRecoilValue(currentUserState);
//   const setUser = useSetRecoilState(currentUserState);
//   const navigate = useNavigate();

//   const { mutate } = useMutation({
//     mutationFn: (userId: string) => deleteUser(userId),
//     onSuccess: () => {
//       localStorage.removeItem("user");

//       setUser(null);
//       navigate("/signin");
//     },
//     onError: (error) => {
//       console.error("Error deleting user:", error);
//     },
//   });

//   if (!user) {
//     navigate("/signin");
//     return null;
//   }
//   const handleEditProfile = () => {
//     const userToSend = {
//       firstName: user.firstName,
//       lastName: user.lastName,
//       userName: user.userName,
//       email: user.email,
//       phone: user.phone,
//       profileImage: user.profileImage,
//       changedDate: new Date(),
//       auth: user.auth,
//       password: user.password,
//     } as unknown as SignUpFormValues;

//     navigate("/edit-profile", {
//       state: { mode: "edit", user: userToSend, userid: user._id.toString() },
//     });
//   };
//   const handleDeleteUser = async () => {
//     if (user) {
//       mutate(user._id.toString());
//     }
//   };

//   return (
//     <div>
//       <Card sx={{ maxWidth: 400, margin: "auto", mt: 5, p: 2 }}>
//         <CardContent>
//           <Avatar
//             src={`http://localhost:5000/${user.profileImage}`}
//             alt={user.firstName}
//             sx={{ width: 80, height: 80, margin: "auto" }}
//           />
//           <Typography
//             variant="h5"
//             fontWeight={"medium-bold"}
//             textAlign="center"
//             mt={2}
//           >
//             {user.firstName} {user.lastName}
//           </Typography>
//           <Typography variant="body1" color="textSecondary" textAlign="center">
//             {user.email}
//             <br />
//             {user.phone}
//             <br />
//             Last profile update:{" "}
//             {dayjs(user.changedDate).format(" MMMM D, YYYY")}
//           </Typography>
//           <Button
//             fullWidth
//             variant="contained"
//             sx={{ mt: 3 }}
//             onClick={handleEditProfile}
//           >
//             Edit Profile
//           </Button>
//           <Button
//             fullWidth
//             variant="outlined"
//             sx={{ mt: 3 }}
//             onClick={handleDeleteUser}
//           >
//             Delete Profile
//           </Button>
//         </CardContent>
//       </Card>
//       {user._id ? <UserPermissions userId={user._id.toString()} /> : <></>}
//     </div>
//   );
// }
// import { useNavigate } from "react-router-dom";
// import { Button,  Typography, Avatar, Box, Grid, Paper, Container } from "@mui/material";
// import { currentUserState } from "../../context/atom";
// import dayjs from "dayjs";
// import { SignUpFormValues } from "../../types/signUpFormValues";
// import { useMutation } from "@tanstack/react-query";
// import { deleteUser } from "../../services/userApi";
// import { useRecoilValue, useSetRecoilState } from "recoil";
// import UserPermissions from "./UserMessagesHistory";

// export default function Profile() {
//   const user = useRecoilValue(currentUserState);
//   const setUser = useSetRecoilState(currentUserState);
//   const navigate = useNavigate();

//   const { mutate } = useMutation({
//     mutationFn: (userId: string) => deleteUser(userId),
//     onSuccess: () => {
//       localStorage.removeItem("user");

//       setUser(null);
//       navigate("/signin");
//     },
//     onError: (error) => {
//       console.error("Error deleting user:", error);
//     },
//   });

//   if (!user) {
//     navigate("/signin");
//     return null;
//   }

//   const handleEditProfile = () => {
//     const userToSend = {
//       firstName: user.firstName,
//       lastName: user.lastName,
//       userName: user.userName,
//       email: user.email,
//       phone: user.phone,
//       profileImage: user.profileImage,
//       changedDate: new Date(),
//       auth: user.auth,
//       password: user.password,
//     } as unknown as SignUpFormValues;

//     navigate("/edit-profile", {
//       state: { mode: "edit", user: userToSend, userid: user._id.toString() },
//     });
//   };

//   const handleDeleteUser = async () => {
//     if (user) {
//       mutate(user._id.toString());
//     }
//   };

//   return (
//     <Box sx={{ padding: 4, backgroundColor: "#f4f6f8" }}>
//       <Container maxWidth="lg">
//         <Grid container spacing={4} justifyContent="center">
//           {/* User Info Card */}
//           <Grid item xs={12} sm={8} md={6}>
//             <Paper sx={{ padding: 3, boxShadow: 3, backgroundColor: "#ffffff" }}>
//               <Box sx={{ textAlign: "center" }}>
//                 <Avatar
//                   src={`http://localhost:5000/${user.profileImage}`}
//                   alt={user.firstName}
//                   sx={{ width: 120, height: 120, margin: "auto" }}
//                 />
//                 <Typography variant="h5" sx={{ mt: 2, fontWeight: "bold" }}>
//                   {user.firstName} {user.lastName}
//                 </Typography>
//                 <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
//                   {user.email}
//                   <br />
//                   {user.phone}
//                   <br />
//                   Last profile update: {dayjs(user.changedDate).format("MMMM D, YYYY")}
//                 </Typography>
//                 <Box sx={{ mt: 3 }}>
//                   <Button
//                     variant="contained"
//                     fullWidth
//                     sx={{ mb: 2 }}
//                     onClick={handleEditProfile}
//                   >
//                     Edit Profile
//                   </Button>
//                   <Button
//                     variant="outlined"
//                     fullWidth
//                     onClick={handleDeleteUser}
//                   >
//                     Delete Profile
//                   </Button>
//                 </Box>
//               </Box>
//             </Paper>
//           </Grid>

//           {/* User Permissions */}
//           <Grid item xs={12} sm={8} md={6}>
//             <Paper sx={{ padding: 3, boxShadow: 3, backgroundColor: "#ffffff" }}>

//               <UserPermissions userId={user._id.toString()} />
//             </Paper>
//           </Grid>
//         </Grid>
//       </Container>
//     </Box>
//   );
// }

import { useState } from "react";
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
} from "@mui/material";
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

const drawerWidth = 240;

const Profile = () => {
  const [currentPage, setCurrentPage] = useState<string>("profile");
  const user = useRecoilValue(currentUserState);
  const setUser = useSetRecoilState(currentUserState);
  const navigate = useNavigate();
  const { isModalOpen, openModal, closeModal } = useModal();
  useMessages();

  const handleMenuClick = (page: string) => {
    setCurrentPage(page);
  };

  const handleDeleteUser = async () => {
    openModal();
    if (user) {
      // Handle delete user
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

        {/* Drawer */}
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

        {/* Main Content */}
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
