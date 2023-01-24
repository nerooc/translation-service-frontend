import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { createMessage, deleteMessage, fetchMessages, removeMessageTag, updateMessage } from "api/messages";
import { Message, MessageCreateData, MessageUpdate } from "api/types";

export const useMessages = () => {
  const queryClient = useQueryClient();
  const {data: messages} = useQuery({queryKey: ['messages'], queryFn: fetchMessages});
  // TODO: Add state for filters & return setter for them 

  const refreshMessages = () => queryClient.invalidateQueries({
    predicate: (query) => query.queryKey[0] === 'messages',
  });
  
  const createMutation = useMutation<Message, unknown, MessageCreateData>({
    mutationFn: (messageData) => createMessage(messageData),
    onSuccess: refreshMessages,
  });

  const updateMutation = useMutation<Message, unknown, {id: number, update: MessageUpdate}>({
    mutationFn: ({id, update}) => updateMessage(id, update),
    onSuccess: refreshMessages,
  });

  const deleteMutation = useMutation<Message, unknown, number>({
    mutationFn: (id) => deleteMessage(id),
    onSuccess: refreshMessages,
  });

  const removeTagMutation = useMutation<void, unknown, {messageId: number, tagId: number}>({
    mutationFn: ({messageId, tagId}) => removeMessageTag(messageId, tagId),
    onSuccess: refreshMessages,
  });

  return {
    messages,
    createMessage: (data: MessageCreateData) => createMutation.mutate(data),
    updateMessage: (id: number, update: MessageUpdate) => updateMutation.mutate({id, update}),
    deleteMessage: (messageId: number) => deleteMutation.mutate(messageId),
    removeMessageTag: (messageId: number, tagId: number) => removeTagMutation.mutate({messageId, tagId}),
  }
};
