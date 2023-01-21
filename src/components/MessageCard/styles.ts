import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const MessageCardContainer = styled(Box)(() => ({
  display: "flex",
  width: "350px",
  height: "200px",
  flexDirection: "column",
  flexBasis: "33%",
  background: "#D2DFFF",
  border: "1px solid #000000",
  boxShadow: "3px 6px 13px rgba(0, 0, 0, 0.25)",
  padding: "5px 15px 10px 15px",
}));

export const MessageCardHeader = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  flexBasis: "15%",
}));

export const LanguagePicker = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
}));

export const MessageManagementIcons = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
}));

export const ContentText = styled(Typography)(() => ({
  fontWeight: 700,
  fontSize: "16px",
  lineHeight: "19px",
  flexBasis: "70%",
  overflowY: "auto",
  marginBottom: "10px",

  "&::-webkit-scrollbar": {
    width: "5px",
    background: "rgba(0, 0, 0, 0.11)",
  },

  "&::-webkit-scrollbar-thumb": {
    background: "#656565",
  },
}));

export const TagsContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  overflowX: "auto",
  paddingBottom: "3px",
  gap: "5px",

  "&::-webkit-scrollbar": {
    height: "5px",
    background: "rgba(0, 0, 0, 0.11)",
  },

  "&::-webkit-scrollbar-thumb": {
    background: "#656565",
  },
}));

export const Tag = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  background: "#000000",
  color: "#FFFFFF",
  border: "1px solid #000000",
  boxSizing: "border-box",
  padding: "5px 10px",
  gap: "10px",
  fontSize: "12px",
  fontWeight: 700,
}));
