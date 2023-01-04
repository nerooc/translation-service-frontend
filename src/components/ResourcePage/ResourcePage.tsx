import { Pagination, Stack, Typography, Button, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import {SearchBar} from '../SearchBar';

import type { ResourcePageProps } from './types';

export const ResourcePage = ({
  title, 
  children, 
  onSearchPhraseChange, 
  onAddItemClick, 
  onPageChange,
}: ResourcePageProps) => {
  return (
    <Stack paddingTop={8} paddingX={6} paddingBottom={4} width="100%" gap={4} height="100vh">
      <Stack flexDirection="row">
        <Typography variant='h1' fontSize={32} fontWeight={700} flex={1}>{title}</Typography>
        <Stack flexDirection="row" gap={1}>
          <SearchBar placeholder='search for tags...' onChange={onSearchPhraseChange}/>
          <Button variant='contained' sx={{height: 40, width: 80}} onClick={onAddItemClick}>
            <AddIcon />
          </Button>
        </Stack>
      </Stack>
      <Box flex={1}>
        {children}
      </Box>
      <Stack justifyContent="center" alignItems="center">
        <Pagination count={10} color="primary" onChange={(_, page) => onPageChange?.(page)} />
      </Stack>
    </Stack>
  );
};
