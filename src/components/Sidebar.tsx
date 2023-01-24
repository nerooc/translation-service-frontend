import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import { routes } from "../constants";
import { Logo } from "../assets";
import { Links, SidebarContainer } from "./styles";

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
          <IconButton key={route.path} component={Link} to={route.path}>
            <route.icon sx={iconStyles} />
          </IconButton>
        ))}
      </Links>
    </SidebarContainer>
  );
};
