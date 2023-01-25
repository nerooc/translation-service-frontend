export type SearchBarProps = {
  placeholder?: string;
  value?: string;
  openFilters?(): void;
  onChange?(value: string): void;
};
