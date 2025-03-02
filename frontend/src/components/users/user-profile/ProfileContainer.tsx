import { useState} from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Box, CssBaseline, Container, useMediaQuery, useTheme } from "@mui/material";
import { useNavigate} from "react-router-dom";
import ProfileSidebar from "./ProfileSidebar";
import UserProfile from "./UserProfile";
import UserPermissions from "./UserMessagesHistory";
import { currentUserState } from "../../../context/atom";
import { useModal } from "../../../hooks/useModal";
import useProfileTabs from "../../../hooks/users/useProfileTabs";
import { useMessages } from "../../../hooks/messages/useMessages";
import useAdminAuth from "../../../hooks/auth/useAdminAuth";
import { deleteUser } from "../../../services/api/userApi";
import PermissionRequestForm from "../../permissions/PermissionRequest";
import SignUpUpdate from "../auth/SignUpUpdate";
import ConfirmModal from "../../states/ConfirmModal";


const Profile = () => {
  const user = useRecoilValue(currentUserState);
  const setUser = useSetRecoilState(currentUserState);
  const navigate = useNavigate();
  const { isModalOpen, openModal, closeModal } = useModal();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);

  // Manage tab state dynamically
  const { currentPage, setCurrentPage } = useProfileTabs();

  useMessages();
  const isAdmin = useAdminAuth(false);

  const handleDeleteUser = async () => {
    if (!user) return;
    await deleteUser(user._id.toString());
    setUser(null);
    navigate("/signin");
  };

  if (!user) {
    navigate("/signin");
    return null;
  }

  const tabs = {
    profile: <UserProfile user={user} isAdmin={isAdmin} openModal={openModal} />,
    permissions: <UserPermissions userId={user._id.toString()} />,
    "permission-form": <PermissionRequestForm />,
    "edit-profile": <SignUpUpdate mode="edit" />,
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <ProfileSidebar
        isMobile={isMobile}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        setCurrentPage={setCurrentPage}
      />
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
      {tabs[currentPage as keyof typeof tabs] || <Container>Page not found</Container>}
      </Box>
      <ConfirmModal type="delete" open={isModalOpen} onClose={closeModal} onConfirm={handleDeleteUser} />
    </Box>
  );
};

export default Profile;
