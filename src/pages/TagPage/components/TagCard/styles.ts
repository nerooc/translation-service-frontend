import { styled } from "@mui/material";

export const StyledListItem = styled("li")(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.text.secondary,
  borderRadius: "5px",
  padding: "20px",
  fontSize: "150%",
  listStyleType: "none",
  boxShadow:
    "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",

  "*": {
    color: "white",
  },
}));

export const MainSection = styled("section")(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
}));

export const SettingsSection = styled("section")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  "& *": { color: theme.palette.text.secondary },
}));
