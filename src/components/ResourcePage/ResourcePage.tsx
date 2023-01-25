import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import AddIcon from "@mui/icons-material/Add";
import { Page, SearchBar } from "components";
import type { ResourcePageProps } from "./types";
import { AddItemButton } from "./styles";

export const ResourcePage = ({
  title,
  filters,
  searchBarPlaceholder,
  numberOfPages,
  children,
  onSearchPhraseChange,
  onFiltersModalOpen,
  onAddItemClick,
  onPageChange,
}: ResourcePageProps) => {
  return (
    <Page
      title={title}
      headerRightElement={
        <Stack flexDirection="row" gap={1}>
          <SearchBar
            placeholder={searchBarPlaceholder}
            value={filters?.searchPhrase}
            onChange={onSearchPhraseChange}
            openFilters={onFiltersModalOpen}
          />
          <AddItemButton variant="contained" onClick={onAddItemClick}>
            <AddIcon />
          </AddItemButton>
        </Stack>
      }
      footer={
        <Pagination
          count={numberOfPages}
          color="primary"
          onChange={(_, page) => onPageChange?.(page)}
        />
      }
    >
      {children}
    </Page>
  );
};
