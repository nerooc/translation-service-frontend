import { rest } from "msw";

import {
  messageGetResolver,
  messagePostResolver,
  messagePutResolver,
  messageDeleteResolver,
  messageOriginalGetResolver,
  messageDeleteTagResolver,
} from "./resolvers";

export const messageHandlers = [
  rest.get("/messages", messageGetResolver),
  rest.post("/messages", messagePostResolver),
  rest.put("/messages/:id", messagePutResolver),
  rest.delete("/messages/:id", messageDeleteResolver),
  rest.get("/messages/original", messageOriginalGetResolver),
  rest.delete("/messages/:id/tags/:tagId", messageDeleteTagResolver),
];
