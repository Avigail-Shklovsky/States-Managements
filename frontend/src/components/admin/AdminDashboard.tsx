import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
  CssBaseline,
  Drawer,
} from "@mui/material";
import useAdminAuth from "../../hooks/auth/useAdminAuth";
import { useState } from "react";
import AdminUsers from "./AdminUsers";
import AdminMessages from "./AdminMessages";
import { useUsers } from "../../hooks/users/useUsers";
import { useMessages } from "../../hooks/messages/useMessages";
import { useNavigate } from "react-router";

const drawerWidth = 240;

const AdminDashboard = () => {
  useAdminAuth();
  useUsers();
  useMessages();
  const [currentPage, setCurrentPage] = useState<string>("dashboard");
const navigate = useNavigate()
  const handleMenuClick = (page: string) => {
    setCurrentPage(page);
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
  
      <Box sx={{ display: "flex", width: "100%", mt: 8 }}>
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
              onClick={() => {
                handleMenuClick("manageUsers");
              }}
            >
              <ListItemText primary="Manage Users" />
            </ListItem>
            <ListItem
              component="button"
              sx={{ backgroundColor: "white", border: "none" }}
              onClick={() => {
                handleMenuClick("manageMessages");
              }}
            >
              <ListItemText primary="Permissions Requests" />
            </ListItem>
            <ListItem
              component="button"
              onClick={()=>{navigate("/")}}
              sx={{ backgroundColor: "white", border: "none" }}
            >
              <ListItemText primary="Exit Dashboard" />
            </ListItem>
          </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
          {currentPage === "dashboard" && (
            <Typography variant="body1">Welcome to the admin panel.</Typography>
          )}
          {currentPage === "manageUsers" && <AdminUsers />}
          {currentPage === "manageMessages" && <AdminMessages />}
        </Box>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
