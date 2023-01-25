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
      secondary: "#000000",
    },

    contrastThreshold: 3,
    tonalOffset: 0.2,
  },

  overrides: {
    MuiInputLabel: {
      root: {
        color: "rgba(255, 255, 255, 0.87)",
      },
    },
  },

  typography: {
    fontFamily: "'Nunito', sans-serif",
  },
};

export const theme = createTheme(options);
