import { List, ListItem, ListItemText, Drawer } from "@mui/material";
import { useNavigate } from "react-router";

const drawerWidth = 240;

interface AdminSidebarProps {
  isMobile: boolean;
  mobileOpen: boolean;
  handleMenuClick: (page: string) => void;
  handleDrawerToggle: () => void;
}

const AdminSidebar = ({
  isMobile,
  mobileOpen,
  handleMenuClick,
  handleDrawerToggle,
}: AdminSidebarProps) => {
  const navigate = useNavigate();

  const drawerContent = (
    <List>
      <ListItem
        component="button"
        sx={{ backgroundColor: "white", border: "none" }}
        onClick={() => handleMenuClick("manageUsers")}
      >
        <ListItemText primary="Manage Users" />
      </ListItem>
      <ListItem
        component="button"
        sx={{ backgroundColor: "white", border: "none" }}
        onClick={() => handleMenuClick("manageMessages")}
      >
        <ListItemText primary="Permissions Requests" />
      </ListItem>
      <ListItem
        component="button"
        onClick={() => navigate("/")}
        sx={{ backgroundColor: "white", border: "none" }}
      >
        <ListItemText primary="Exit Dashboard" />
      </ListItem>
    </List>
  );

  return isMobile ? (
    <Drawer
      variant="temporary"
      open={mobileOpen}
      onClose={handleDrawerToggle}
      ModalProps={{ keepMounted: true }}
      sx={{
        display: { xs: "block", sm: "none" },
        "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" },
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
        "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box", mt: 8 },
      }}
      open
    >
      {drawerContent}
    </Drawer>
  );
};

export default AdminSidebar;
