import { languageHandlers } from './languages';
import { tagHandlers } from './tags';
import { messageHandlers } from "./messages";

export const handlers = [
  ...languageHandlers,
  ...tagHandlers,
  ...messageHandlers,
];
