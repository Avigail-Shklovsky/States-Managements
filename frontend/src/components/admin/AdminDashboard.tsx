import {Box,CssBaseline,Drawer,AppBar,Toolbar,Typography,IconButton,useTheme,useMediaQuery} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { useNavigate } from "react-router";

import useAdminAuth from "../../hooks/auth/useAdminAuth";
import { useUsers } from "../../hooks/users/useUsers";
import { useMessages } from "../../hooks/messages/useMessages";

import AdminUsers from "./AdminUsers";
import AdminMessages from "./messages/AdminMessages";
import Sidebar from "../SideBar";

const drawerWidth = 240;

const AdminDashboard = () => {
  useAdminAuth();
  useUsers();
  useMessages();

  const [currentPage, setCurrentPage] = useState<string>("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuClick = (page: string) => {
    if (page === "exit") {
      navigate("/");
    } else {
      setCurrentPage(page);
    }
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const pages = {
    dashboard: {
      label: "Dashboard",
      component: () => (
        <Typography variant="body1">
          Welcome to the admin panel.
        </Typography>
      ),
    },
    manageUsers: {
      label: "Manage Users",
      component: AdminUsers,
    },
    manageMessages: {
      label: "Permissions Requests",
      component: AdminMessages,
    },
  };

  const ContentComponent =
    pages[currentPage as keyof typeof pages].component;

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

      <Box component="nav">
        <Drawer
          variant={isMobile ? "temporary" : "permanent"}
          open={isMobile ? mobileOpen : true}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "block" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              ...(isMobile ? {} : { top: 64 }), 
            },
          }}
        >
          <Sidebar
            currentPage={currentPage}
            onMenuClick={handleMenuClick}
            pages={pages}
          />
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: isMobile ? 7 : 8,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <ContentComponent />
      </Box>
    </Box>
  );
};

export default AdminDashboard;
