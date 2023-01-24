import { Route, Routes } from "react-router-dom";
import { Box, CssBaseline, styled } from "@mui/material";
import { Sidebar } from "./components";
import { routes } from "./constants";

const AppContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  height: "100vh",
  background: theme.palette.background.default,
}));

const App = () => {
  return (
    <>
      <CssBaseline />
      <AppContainer>
        <Sidebar />
        <Routes>
          {Object.values(routes).map((route) => (
            <Route path={route.path} element={<route.element />} />
          ))}
        </Routes>
      </AppContainer>
    </>
  );
};

export default App;
