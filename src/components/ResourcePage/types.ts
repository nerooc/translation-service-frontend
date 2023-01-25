import React from "react";

export type ResourcePageProps = {
  title: string;
  page?: number;
  searchBarPlaceholder?: string;
  numberOfPages?: number;
  children: React.ReactNode;
  onSearchPhraseChange?(value: string): void;
  onAddItemClick?(): void;
  onPageChange?(page: number): void;
};
