import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useRecoilState } from 'recoil';
import { currentNameStateState } from '../context/atom';



export default function ButtonAppBar() {
  const [name] = useRecoilState(currentNameStateState);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            States Management
          </Typography>
          <Typography>{name}</Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
