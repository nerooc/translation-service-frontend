import MessageIcon from "@mui/icons-material/Message";
import TranslateIcon from "@mui/icons-material/Translate";
import SellIcon from "@mui/icons-material/Sell";
import { LanguagePage, MessagePage, TagPage } from "../pages";

export const routes = {
  MESSAGES: { path: "/messages", icon: MessageIcon, element: MessagePage },
  LANGUAGES: { path: "/languages", icon: TranslateIcon, element: LanguagePage },
  TAGS: { path: "/tags", icon: SellIcon, element: TagPage },
};
