import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";
import {
  ContentText,
  CustomLanguageButton,
  LanguagePicker,
  MessageCardContainer,
  MessageCardHeader,
  MessageManagementIcons,
  Tag,
  TagsContainer,
} from "./styles";
import { MessageCardProps } from "./types";

export const MessageCard = ({
  id,
  content,
  language,
  originalMessage,
  tags,
}: MessageCardProps) => {

  // Probably some hook or something context-like with existing languages
  const languages = ["en", "pl", "de", "fr", "es", "it", "pt", "ru"]
  const [currentLanguage, setCurrentLanguage] = useState(language.code)

  const editMessage = (messageId: number) => {}

  const removeMessage = (messageId: number) => {}

  const removeTag = (tagId: number) => {}

  return (
    <MessageCardContainer>
      <MessageCardHeader>
        <LanguagePicker>
            {languages.map((lang) => (
              <CustomLanguageButton key={lang} isCurrent={currentLanguage === lang} onClick={() => setCurrentLanguage(lang)}>
                {lang.toUpperCase()}
              </CustomLanguageButton>
            ))}
          </LanguagePicker>

        <MessageManagementIcons>
          <IconButton>
            <EditIcon onClick={() => editMessage(id)}/>
          </IconButton>
          <IconButton>
            <DeleteIcon onClick={() => removeMessage(id)}/>
          </IconButton>
        </MessageManagementIcons>
      </MessageCardHeader>
      <ContentText>{content}</ContentText>
      <TagsContainer>
        {tags.map((tag) => (
          <Tag key={tag.id}>
            {tag.name}
            <IconButton sx={{ padding: 0 }} size="small" onClick={() => removeTag(tag.id)}>
              <ClearIcon sx={{ width: "18px", color: "white" }} />
            </IconButton>
          </Tag>
        ))}
      </TagsContainer>
    </MessageCardContainer>
  );
};
