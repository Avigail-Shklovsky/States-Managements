import { Typography, List, ListItem, ListItemText, Box, CssBaseline, Drawer, Toolbar, AppBar } from "@mui/material";
import useAdminAuth from "../../hooks/auth/useAdminAuth";
import { useState } from "react";
import AdminUsers from "./AdminUsers";

const drawerWidth = 240;

const AdminDashboard = () => {
  useAdminAuth(); 
  const [currentPage, setCurrentPage] = useState<string>('dashboard'); 

  const handleMenuClick = (page: string) => {
    setCurrentPage(page);
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Admin Panel
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ display: "flex", width: "100%", mt: 8 }}>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box", mt: 8 },
          }}
        >
          <List>
            <ListItem component="button" sx={{backgroundColor:'white',  border:'none' }} onClick={()=>{handleMenuClick('manageusers')}}>
              <ListItemText primary="Manage Users" />
            </ListItem>
            <ListItem component="button" sx={{backgroundColor:'white',  border:'none' }}>
              <ListItemText primary="Settings" />
            </ListItem>
            <ListItem component="button" sx={{backgroundColor:'white',  border:'none' }}>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
          {/* <Typography variant="h4" fontWeight="bold" gutterBottom>
            Admin Dashboard
          </Typography> */}
          {currentPage === 'dashboard' && <Typography variant="body1">Welcome to the admin panel.</Typography>}

          {currentPage === 'manageUsers' && <AdminUsers />}
        </Box>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
