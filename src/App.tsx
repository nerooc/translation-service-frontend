import { Route, Routes } from "react-router-dom";
import { Box, CssBaseline, styled } from "@mui/material";
import { MessagePage, LanguagePage, TagPage } from "./pages";
import { Sidebar } from "./components";
import { routes } from "./constants";

const AppContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  background: theme.palette.background.default,
}));

const { MESSAGES, LANGUAGES, TAGS } = routes;

const App = () => {
  return (
    <>
      <CssBaseline />
      <AppContainer>
        <Sidebar />
        <Routes>
          <Route path={MESSAGES.path} element={<MessagePage />} />
          <Route path={LANGUAGES.path} element={<LanguagePage />} />
          <Route path={TAGS.path} element={<TagPage />} />
        </Routes>
      </AppContainer>
    </>
  );
};

export default App;
