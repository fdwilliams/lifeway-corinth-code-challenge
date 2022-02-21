import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ color: 'primary.main', flexGrow: 1 }} component="div">Star Wars Character Viewer</Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
