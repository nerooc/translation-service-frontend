import { Paper, Table, TableBody, TableContainer } from "@mui/material";
import { Message } from "api/types";

import { ResourcePage, MessageItem, MessageForm } from "components";
import { MessageFilters } from "components/MessageFilters";
import { useMessages } from "hooks/useMessages";
import { useState } from "react";

export const MessagePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const [messageToEdit, setMessageToEdit] = useState<Message>();
  const {
    messages,
    filters,
    setFilters,
    createMessage,
    updateMessage,
    deleteMessage,
    removeMessageTag,
  } = useMessages();

  return (
    <ResourcePage
      title="Messages"
      filters={filters}
      searchBarPlaceholder="Search for message..."
      numberOfPages={10}
      onSearchPhraseChange={(v) => setFilters({ ...filters, searchPhrase: v })}
      onFiltersModalOpen={() => setIsFiltersModalOpen(true)}
      onAddItemClick={() => setIsModalOpen(true)}
      onPageChange={(page) => console.log("Load languages page", page)}
    >
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableBody>
            {messages?.map((message) => (
              <MessageItem
                key={message.id}
                {...message}
                onDelete={() => deleteMessage(message.id)}
                onEdit={() => {
                  setMessageToEdit(message);
                  setIsModalOpen(true);
                }}
                onRemoveTag={removeMessageTag}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <MessageFilters
        title={"Filters"}
        filters={filters}
        isOpen={isFiltersModalOpen}
        onCancel={() => setIsFiltersModalOpen(false)}
        onSubmit={(data) => {
          setFilters(data as any);
        }}
      />
      <MessageForm
        title={messageToEdit ? "Edit message" : "Add message"}
        isOpen={isModalOpen}
        message={messageToEdit}
        onCancel={() => setIsModalOpen(false)}
        onSubmit={(data) => {
          if (messageToEdit) {
            updateMessage(messageToEdit.id, data);
            setMessageToEdit(undefined);
          } else {
            createMessage(data);
          }
        }}
      />
    </ResourcePage>
  );
};
