import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
  CssBaseline,
  Drawer,
  AppBar,
  Toolbar,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
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
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleMenuClick = (page: string) => {
    setCurrentPage(page);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
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
        onClick={() => {
          navigate("/");
        }}
        sx={{ backgroundColor: "white", border: "none" }}
      >
        <ListItemText primary="Exit Dashboard" />
      </ListItem>
    </List>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {isMobile && (
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Admin Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
      )}

      <Box sx={{ display: "flex", width: "100%", mt: isMobile ? 7 : 8 }}>
        {isMobile ? (
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, 
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box",
              },
            }}
          >
            {drawerContent}
          </Drawer>
        ) : (
          <Drawer
            variant="permanent"
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box",
                mt: 8,
              },
            }}
            open
          >
            {drawerContent}
          </Drawer>
        )}

        <Box component="main" sx={{ flexGrow:1, p: 3, mt: isMobile ? 7 : 8 }}>
          {currentPage === "dashboard" && (
            <Typography variant="body1">
              Welcome to the admin panel.
            </Typography>
          )}
          {currentPage === "manageUsers" && <AdminUsers />}
          {currentPage === "manageMessages" && <AdminMessages />}
        </Box>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
