import * as React from 'react';
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from '@mui/material/Stack';
import Flag from 'react-world-flags';
import Chip from '@mui/material/Chip';

import type {MessageItemProps} from './types';
import { ItemContainer, Cell, ButtonsContainer } from './styles';

export const MessageItem = ({
  id,
  content,
  language,
  tags,
  onEdit,
  onDelete,
  onRemoveTag,
}: MessageItemProps) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <ItemContainer
      key={id}
      hover={isHovered}
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
    >
      <Cell flex={5}>{content}</Cell>
      <Cell align="left" width={60}>
        <Flag code={language.code} height={18} />
      </Cell>
      <Cell align="left" width={60}>
        {language.code.toUpperCase()}
      </Cell>
      <Cell flex={2}>
        <Stack flexDirection="row" flexWrap="wrap" gap={1}>
          {tags.map(tag => (
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
          <IconButton size='small'>
            <EditIcon onClick={() => null} />
          </IconButton>
          <IconButton size="small">
            <DeleteIcon onClick={onDelete} />
          </IconButton>
        </ButtonsContainer>
      </Cell>
    </ItemContainer>
  );
}