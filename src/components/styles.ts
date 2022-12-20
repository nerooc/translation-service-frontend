import { styled, Box } from "@mui/material";

export const SidebarContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: "100vh",
  width: "100px",
  padding: "40px 0",
  backgroundColor: theme.palette.common.white,
  boxShadow: "0px 4px 250px -5px rgba(0, 0, 0, 0.25)",
}));

export const Links = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "50px",
  padding: "80px 0",
}));
