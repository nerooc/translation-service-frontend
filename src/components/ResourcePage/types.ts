import React from 'react';

export type ResourcePageProps = {
  title: string;
  children: React.ReactNode;
  onSearchPhraseChange?(value: string): void;
  onAddItemClick?(): void;
  onPageChange?(page: number): void;
}
