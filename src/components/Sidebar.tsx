import { Link } from "react-router-dom";
import { Box, IconButton, styled } from "@mui/material";
import { routes } from "../constants";
import { Logo } from "../assets";

const SidebarContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: "100vh",
  width: "100px",
  padding: "40px 0",
  backgroundColor: theme.palette.common.white,
  boxShadow: "0px 4px 250px -5px rgba(0, 0, 0, 0.25)",
}));

const Links = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "50px",
  padding: "80px 0",
}));

export const Sidebar = () => {
  const iconStyles = {
    width: 25,
    height: 25,
    color: "common.black",
  };

  return (
    <SidebarContainer>
      <Logo />
      <Links>
        {Object.values(routes).map((route) => (
          <IconButton component={Link} to={route.path}>
            <route.icon sx={iconStyles} />
          </IconButton>
        ))}
      </Links>
    </SidebarContainer>
  );
};
