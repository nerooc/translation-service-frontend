import { rest } from "msw";

import {
  messageDeleteResolver,
  messageGetResolver,
  messagePostResolver,
} from "./resolvers";

export const messageHandlers = [
  rest.get("/messages", messageGetResolver),
  rest.post("/messages", messagePostResolver),
  rest.delete("/messages/:id", messageDeleteResolver),
];
