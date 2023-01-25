import { Paper, Table, TableBody, TableContainer } from "@mui/material";
import { Message } from "api/types";

import { ResourcePage, MessageItem, MessageForm } from "components";
import { MessageFiltersModal } from "components/MessageFiltersModal";
import { usePagination } from "hooks";
import { useMessages } from "hooks/useMessages";
import { useState } from "react";

export const MessagePage = () => {
  const [page, setPage] = useState(1);
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

  const PER_PAGE = 10;

  const handlePageChange = (p: any) => {
    setPage(p);
    _DATA.jump(p);
  };

  const count = Math.ceil((messages || []).length / PER_PAGE);
  const _DATA = usePagination(messages || [], PER_PAGE);

  return (
    <ResourcePage
      title="Messages"
      page={page}
      filters={filters}
      searchBarPlaceholder="Search for message..."
      numberOfPages={count}
      onSearchPhraseChange={(v) => setFilters({ ...filters, searchPhrase: v })}
      onFiltersModalOpen={() => setIsFiltersModalOpen(true)}
      onAddItemClick={() => setIsModalOpen(true)}
      onPageChange={handlePageChange}
    >
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableBody>
            {_DATA?.currentData()?.map((message) => (
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
      <MessageFiltersModal
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
