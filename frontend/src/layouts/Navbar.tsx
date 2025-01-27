import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useRecoilValue } from "recoil";
import { currentNameStateState } from "../context/atom";

export default function ButtonAppBar() {
  const currentName = useRecoilValue(currentNameStateState);

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: "red" }} position="sticky">
      <AppBar>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            States Management
          </Typography>
          <Typography
            sx={{
              color: "yellow",
              fontWeight: "500",
              fontSize: "1rem",
            }}
          >
            {currentName.length > 0 ? `updating ${currentName}` : ""}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
