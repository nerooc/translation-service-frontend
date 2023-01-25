import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createMessage,
  deleteMessage,
  fetchMessages,
  removeMessageTag,
  updateMessage,
} from "api/messages";
import {
  Message,
  MessageCreateData,
  MessageUpdate,
  MesssageFilters,
} from "api/types";

export const useMessages = () => {
  const queryClient = useQueryClient();
  const [filters, setFilters] = useState<MesssageFilters>({
    searchPhrase: "",
    language: null,
    tags: [],
  });

  const { data: messages } = useQuery({
    queryKey: ["messages"],
    queryFn: fetchMessages,
  });

  const filteredMessages = messages?.filter((message) => {
    const condition = message.content
      .toLowerCase()
      .includes(filters.searchPhrase.toLowerCase());

    let condition2 = true;

    if (filters.language) {
      condition2 = message.language.code.includes(filters.language.code);
    }

    let condition3 = true;

    if (filters.tags.length > 0) {
      condition3 = filters.tags.every((tag) =>
        message.tags.some((messageTag) => messageTag.id === tag.id)
      );
    }

    return condition && condition2 && condition3;
  });

  const refreshMessages = () =>
    queryClient.invalidateQueries({
      predicate: (query) => query.queryKey[0] === "messages",
    });

  const createMutation = useMutation<Message, unknown, MessageCreateData>({
    mutationFn: (messageData) => createMessage(messageData),
    onSuccess: refreshMessages,
  });

  const updateMutation = useMutation<
    Message,
    unknown,
    { id: number; update: MessageUpdate }
  >({
    mutationFn: ({ id, update }) => updateMessage(id, update),
    onSuccess: refreshMessages,
  });

  const deleteMutation = useMutation<Message, unknown, number>({
    mutationFn: (id) => deleteMessage(id),
    onSuccess: refreshMessages,
  });

  const removeTagMutation = useMutation<
    void,
    unknown,
    { messageId: number; tagId: number }
  >({
    mutationFn: ({ messageId, tagId }) => removeMessageTag(messageId, tagId),
    onSuccess: refreshMessages,
  });

  return {
    messages: filteredMessages,
    filters,
    setFilters,
    createMessage: (data: MessageCreateData) => createMutation.mutate(data),
    updateMessage: (id: number, update: MessageUpdate) =>
      updateMutation.mutate({ id, update }),
    deleteMessage: (messageId: number) => deleteMutation.mutate(messageId),
    removeMessageTag: (messageId: number, tagId: number) =>
      removeTagMutation.mutate({ messageId, tagId }),
  };
};
