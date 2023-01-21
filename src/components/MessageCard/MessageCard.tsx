import React from "react";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";
import {
  ContentText,
  LanguagePicker,
  MessageCardContainer,
  MessageCardHeader,
  MessageManagementIcons,
  Tag,
  TagsContainer,
} from "./styles";
import { MessageCardProps } from "./types";

export const MessageCard = ({
  content,
  language,
  originalMessage,
  tags,
}: MessageCardProps) => {
  return (
    <MessageCardContainer>
      <MessageCardHeader>
        <LanguagePicker>Original | EN | DE | FR</LanguagePicker>

        <MessageManagementIcons>
          <IconButton>
            <EditIcon />
          </IconButton>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </MessageManagementIcons>
      </MessageCardHeader>
      <ContentText>{content}</ContentText>
      <TagsContainer>
        {tags.map((tag) => (
          <Tag key={tag.id}>
            {tag.name}
            <IconButton sx={{ padding: 0 }} size="small">
              <ClearIcon sx={{ width: "18px", color: "white" }} />
            </IconButton>
          </Tag>
        ))}
      </TagsContainer>
    </MessageCardContainer>
  );
};
