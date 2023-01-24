import { rest } from "msw";

import {
  messageGetResolver,
  messagePostResolver,
  messagePutResolver,
  messageDeleteResolver,
  messageDeleteTagResolver,
} from "./resolvers";

export const messageHandlers = [
  rest.get("/messages", messageGetResolver),
  rest.post("/messages", messagePostResolver),
  rest.put("/messages/:id", messagePutResolver),
  rest.delete("/messages/:id", messageDeleteResolver),
  rest.delete("/messages/:id/tags/:tagId", messageDeleteTagResolver),
];
