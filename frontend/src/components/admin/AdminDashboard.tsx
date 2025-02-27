import {
  Typography,
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import useAdminAuth from "../../hooks/auth/useAdminAuth";
import { useState } from "react";
import AdminUsers from "./users/AdminUsers";
import AdminMessages from "./AdminMessages";
import { useUsers } from "../../hooks/users/useUsers";
import { useMessages } from "../../hooks/messages/useMessages";
import AdminSidebar from "./AdminSidebar";

const AdminDashboard = () => {
  useAdminAuth();
  useUsers();
  useMessages();

  const [currentPage, setCurrentPage] = useState<string>("dashboard");
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

  const pages: Record<string, React.ReactNode> = {
    dashboard: <Typography variant="body1">Welcome to the admin panel.</Typography>,
    manageUsers: <AdminUsers />,
    manageMessages: <AdminMessages />,
  };

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
        <AdminSidebar
          isMobile={isMobile}
          mobileOpen={mobileOpen}
          handleMenuClick={handleMenuClick}
          handleDrawerToggle={handleDrawerToggle}
        />

        <Box component="main" sx={{ flexGrow: 1, p: 3, mt: isMobile ? 7 : 8 }}>
          {pages[currentPage]}
        </Box>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
