import { Paper, Table, TableBody, TableContainer } from "@mui/material";

import { ResourcePage, MessageItem } from "components";
import { useMessages } from "hooks/useMessages";

export const MessagePage = () => {
  const {
    messages,
    createMessage,
    updateMessage,
    deleteMessage,
    removeMessageTag
  } = useMessages();

  const handleCreateMessage = () => {
    createMessage({
      originalMessage: null,
      content: "Cześć",
      language: {
        id: 1,
        name: "English",
        code: "EN",
      },
      tags: [],
    }); 
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
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableBody>
          {messages?.map(({id, ...rest}) => (
            <MessageItem
              key={id}
              id={id}
              {...rest}
              onDelete={() => deleteMessage(id)}
              onEdit={updateMessage}
              onRemoveTag={removeMessageTag}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </ResourcePage>
  );
};
