import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: "#222227",
  padding: theme.spacing(1),
}));

export default StyledPaper;
