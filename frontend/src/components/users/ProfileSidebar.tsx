import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const drawerWidth = 240;
interface ProfileSidebarProps {
  isMobile: boolean;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  setCurrentPage: (
    page: "profile" | "permissions" | "permission-form" | "edit-profile"
  ) => void;
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({
  isMobile,
  mobileOpen,
  setMobileOpen,
  setCurrentPage,
}) => {
  const tabs = [
    { label: "Profile", key: "profile" },
    { label: "Edit Profile", key: "edit-profile" },
    { label: "Permissions", key: "permissions" },
    { label: "Permissions Request Form", key: "permission-form" },
  ];

  return (
    <>
      {isMobile && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={() => setMobileOpen(!mobileOpen)}
          sx={{ position: "absolute", top: 16, left: 16, color: "white" }}
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
          {tabs.map((item) => (
            <ListItem
              key={item.key}
              component="button"
              sx={{ backgroundColor: "white", border: "none" }}
              onClick={() => {
                setCurrentPage(
                  item.key as
                    | "profile"
                    | "permissions"
                    | "permission-form"
                    | "edit-profile"
                );
                setMobileOpen(false);
              }}
            >
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default ProfileSidebar;
