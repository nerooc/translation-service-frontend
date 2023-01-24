import { createTheme } from "@mui/material";

export const options = {
  palette: {
    primary: {
      main: "#5081FF",
    },
    secondary: {
      main: "#D2DFFF",
    },
    background: {
      default: "#FBFBFB",
    },
    text: {
      primary: "#000000",
      secondary: "#e9f2ff",
    },

    contrastThreshold: 3,
    tonalOffset: 0.2,
  },

  typography: {
    fontFamily: "'Nunito', sans-serif",
  },
};

export const theme = createTheme(options);
