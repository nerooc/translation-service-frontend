import * as React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from '@mui/material/Stack';
import Flag from 'react-world-flags';
import Chip from '@mui/material/Chip';

import type {MessageItemProps} from './types';

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
    <TableRow
      key={id}
      sx={{ display: 'flex', '&:last-child td, &:last-child th': { border: 0 }}}
      hover={isHovered}
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
    >
      <TableCell sx={{flex: 5}}>{content}</TableCell>
      <TableCell align="left" sx={{width: 60}}>
        <Flag code={language.code} height={18} />
      </TableCell>
      <TableCell align="left" sx={{width: 60}}>
        {language.code.toUpperCase()}
      </TableCell>
      <TableCell sx={{flex: 2}}>
        <Stack flexDirection="row" flexWrap="wrap" gap={1}>
          {tags.map(tag => (
            <Chip
              key={tag.id}
              label={tag.name}
              onDelete={() => onRemoveTag(id, tag.id)}
            />
          ))}
        </Stack>
      </TableCell>
      <TableCell align="right">
        <Stack flexDirection="row" sx={{width: 70, opacity: isHovered ? 1 : 0, transition: 'opacity 0.2s ease-in-out'}}>
          <IconButton size='small'>
            <EditIcon onClick={() => null} />
          </IconButton>
          <IconButton size="small">
            <DeleteIcon onClick={onDelete} />
          </IconButton>
        </Stack>
      </TableCell>
    </TableRow>
  );
}