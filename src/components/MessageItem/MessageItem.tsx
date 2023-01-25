import * as React from "react";

import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import Flag from "react-world-flags";
import Chip from "@mui/material/Chip";

import { languageCodeToCountryCode } from "utils/codes";

import type { MessageItemProps } from "./types";
import { ItemContainer, Cell, ButtonsContainer } from "./styles";

export const MessageItem = ({
  id,
  content,
  language,
  tags,
  onEdit,
  onDelete,
  onRemoveTag,
  isOriginal,
}: MessageItemProps) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <ItemContainer
      key={id}
      hover={isHovered}
      original={isOriginal}
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
    >
      <Cell flex={5}>{content}</Cell>
      <Cell align="left" width={60}>
        <Flag code={languageCodeToCountryCode(language.code)} height={18} />
      </Cell>
      <Cell align="left" width={60}>
        {language.code.toUpperCase()}
      </Cell>
      <Cell flex={2}>
        <Stack flexDirection="row" flexWrap="wrap" gap={1}>
          {tags.map((tag) => (
            <Chip
              key={tag.id}
              label={tag.name}
              onDelete={() => onRemoveTag(id, tag.id)}
            />
          ))}
        </Stack>
      </Cell>
      <Cell align="right">
        <ButtonsContainer hovered={isHovered}>
          <IconButton size="small" onClick={onEdit}>
            <EditIcon />
          </IconButton>
          <IconButton size="small" onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        </ButtonsContainer>
      </Cell>
    </ItemContainer>
  );
};
