import { useState } from "react";
import { Typography, Button, Drawer, List } from "@mui/material";
import useAdminAuth from "../../hooks/useAdminAuth";

const AdminDashboard = () => {

    useAdminAuth(); 

  const [open, setOpen] = useState(false);

  const toggleDrawer = (state: boolean) => () => {
    setOpen(state);
  };

  return (
    <div className="flex flex-col items-center p-6">
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Admin Dashboard
      </Typography>
      <Button variant="contained" color="primary" onClick={toggleDrawer(true)}>
        Open Menu
      </Button>
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <List>
          {/* <ListItem button>
            <ListItemText primary="Manage Users" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Settings" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Logout" />
          </ListItem> */}
        </List>
      </Drawer>
    </div>
  );
};

export default AdminDashboard;
