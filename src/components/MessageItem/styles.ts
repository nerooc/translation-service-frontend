import styled from "@emotion/styled";
import Stack from "@mui/material/Stack";
import TableCell from "@mui/material/TableCell";
import TableRow from '@mui/material/TableRow';

export const ItemContainer = styled(TableRow)(() => ({
  display: 'flex',
  '&:last-child td, &:last-child th': { border: 0 }
}));

export const Cell = styled(TableCell)<{flex?: number, width?: number}>(({flex, width}) => ({
  flex,
  width,
}));

export const ButtonsContainer = styled(Stack)<{hovered: boolean}>(({ hovered }) => ({
  flexDirection: 'row',
  width: 70,
  opacity: hovered ? 1 : 0,
  transition: 'opacity 0.2s ease-in-out',
}));