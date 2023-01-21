import { MessageCreateData } from "api/types";
import { rest } from "msw";

export type MessagesGetResolver = Parameters<typeof rest.get>[1];

export type MessagesPostResolver = Parameters<
  typeof rest.post<MessageCreateData>
>[1];

export type MessagesDeleteResolver = Parameters<
  typeof rest.delete<{}, { id: string }>
>[1];
