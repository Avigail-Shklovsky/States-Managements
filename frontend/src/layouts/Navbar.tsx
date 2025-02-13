import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../context/atom";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { signout } from "../services/authApi";
import { useAuth } from "../hooks/auth/useAuth";
import { useNavigate } from "react-router";

export default function ButtonAppBar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const user = useRecoilValue(currentUserState);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleSignin = () => {
    navigate("/signin");
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    signout();
    logout();
    handleClose();
    navigate("/signin");
  };

  return (
    <Box sx={{ flexGrow: 1 }} position="sticky">
      <AppBar>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              cursor: "pointer",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
            onClick={() => navigate("/")}
          >
            States Management
          </Typography>

          {user ? (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar
                  src={`http://localhost:5000/${user.profileImage}`}
                  alt={user.firstName}
                />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => navigate("/profile")}>
                  Profile
                </MenuItem>
                <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
              </Menu>
            </div>
          ) : (
            <MenuItem onClick={handleSignin}>Sign In</MenuItem>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
