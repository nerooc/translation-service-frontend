import React from "react";
import { MesssageFilters } from "api/types";

export type ResourcePageProps = {
  title: string;
  filters?: MesssageFilters;
  searchBarPlaceholder?: string;
  numberOfPages?: number;
  children: React.ReactNode;
  onSearchPhraseChange?(value: string): void;
  onFiltersModalOpen?(): void;
  onAddItemClick?(): void;
  onPageChange?(page: number): void;
};
