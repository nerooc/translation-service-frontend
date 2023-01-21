import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createMessage, deleteMessage, fetchMessages } from "api/messages";
import { Message, MessageCreateData } from "api/types";
import { MessageCard, ResourcePage } from "components";

type MessagePageProps = {};

export const MessagePage = (props: MessagePageProps) => {
  // Just some random code to give an working example of Mock Service Worker, delete while implementing task for this page
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["messages"],
    queryFn: fetchMessages,
  });

  const createMutation = useMutation<Message, unknown, MessageCreateData>({
    mutationFn: (messageData) => createMessage(messageData),
    onSuccess: () => queryClient.invalidateQueries(["messages"]),
  });

  const deleteMutation = useMutation<Message, unknown, number>({
    mutationFn: (id) => deleteMessage(id),
    onSuccess: () => queryClient.invalidateQueries(["messages"]),
  });

  const handleCreateMessage = () => {
    createMutation.mutate({
      originalMessageId: 1,
      content: "Cześć",
      languageId: 1,
      tags: [
        { id: 1, name: "test" },
        { id: 2, name: "test2" },
      ],
    });
  };

  const handleDeleteMessage = (id: number) => {
    deleteMutation.mutate(id);
  };

  return (
    <ResourcePage
      title="Messages"
      searchBarPlaceholder="Search for message..."
      numberOfPages={10}
      onSearchPhraseChange={(v) => console.log("Search languages:", v)}
      onAddItemClick={handleCreateMessage}
      onPageChange={(page) => console.log("Load languages page", page)}
    >
      {data?.map((message) => (
        <MessageCard {...message} />
      ))}
    </ResourcePage>
  );
};
