import { MessageCreateData, MessageUpdate } from "api/types";
import { rest } from "msw";

export type MessagesGetResolver = Parameters<typeof rest.get>[1];

export type MessagesPostResolver = Parameters<
  typeof rest.post<MessageCreateData>
>[1];

export type MessagesPutResolver = Parameters<typeof rest.put<MessageUpdate, {id: string}>>[1];

export type MessagesDeleteResolver = Parameters<
  typeof rest.delete<{}, { id: string }>
>[1];

export type MessageOriginalGetResolver = Parameters<typeof rest.get>[1];

export type MessageTagDeleteResolver = Parameters<
  typeof rest.delete<{}, { id: string; tagId: string }>
>[1];
