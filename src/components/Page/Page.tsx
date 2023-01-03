import { Pagination, Stack, Typography, TextField, Button, InputAdornment } from '@mui/material';
import { Box } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import type { PageProps } from './types';

export const Page = ({title, children}: PageProps) => {
  return (
    <Stack paddingTop={8} paddingX={6} paddingBottom={4} width="100%" gap={4} height="100vh">
      <Stack flexDirection="row">
        <Typography variant='h1' fontSize={32} fontWeight={700} flex={1}>{title}</Typography>
        <Stack flexDirection="row" gap={1}>
          <TextField
            size='small' 
            sx={{fontSize: 14}}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                <SearchIcon />
              </InputAdornment>
              ), 
              endAdornment: (
                <InputAdornment position='end'>
                  <FilterAltIcon />
                </InputAdornment>
              )
            }}
          />
          <Button variant='contained' sx={{height: 40, width: 80}}>
            <AddIcon />
          </Button>
        </Stack>
      </Stack>
      <Box flex={1}>
        {children}
      </Box>
      <Stack justifyContent="center" alignItems="center">
        <Pagination count={10} color="primary" onChange={(_, page) => console.log('Page changed', page)} />
      </Stack>
    </Stack>
  );
};