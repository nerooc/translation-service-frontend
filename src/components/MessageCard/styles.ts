import { Button, styled } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const MessageCardContainer = styled(Box)(() => ({
  display: "flex",
  width: "400px",
  height: "250px",
  flexDirection: "column",
  flexBasis: "25%",
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

export const CustomLanguageButton = styled(Button)<{isCurrent: boolean}>(({isCurrent}) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  cursor: "pointer",
  background: "none",
  border: "none",
  minWidth: '50px',
  fontWeight: isCurrent ? 800 : 400,
  color: "black",
}));


export const LanguagePicker = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  overflow: "auto",
  marginRight: "20px",

  "&::-webkit-scrollbar": {
    height: "3px",
    background: "rgba(0, 0, 0, 0.11)",
  },

  "&::-webkit-scrollbar-thumb": {
    background: "#656565",
  },
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
  marginTop: "15px",
  marginBottom: "20px",

  "&::-webkit-scrollbar": {
    width: "3px",
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
  gap: "3px",

  "&::-webkit-scrollbar": {
    height: "3px",
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
