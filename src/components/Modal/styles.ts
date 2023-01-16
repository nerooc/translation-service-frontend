import { styled} from "@mui/material";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export const ModalContainer = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: theme.palette.background.paper,
  border: "2px solid black",
  boxShadow: "24px",
  paddingTop: theme.spacing(2),
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(4),
  paddingBottom: theme.spacing(2),
}));

export const ModalHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingBottom: theme.spacing(2),
}));

export const ModalTitle = styled(Typography)(() => ({
  fontSize: 24,
  fontWeight: 700,
}));
