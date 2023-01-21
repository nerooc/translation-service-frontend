import { styled } from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export const PageContainer = styled(Stack)(({ theme }) => ({
  width: "100%",
  height: "100vh",
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(4),
  paddingLeft: theme.spacing(6),
  paddingRight: theme.spacing(6),
  gap: theme.spacing(4),
}));

export const Header = styled(Stack)(() => ({
  flexDirection: "row",
  justifyContent: "space-between",
}));

export const Content = styled(Stack)(({ theme }) => ({
  flex: 1,
  flexDirection: "row",
  flexWrap: "wrap",
  gap: theme.spacing(4),
}));

export const Footer = styled(Stack)(() => ({
  alignItems: "center",
  justifyContent: "center",
}));

export const Title = styled(Typography)(() => ({
  fontSize: 32,
  fontWeight: 700,
}));
