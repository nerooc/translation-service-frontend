export type Language = {
  id: number;
  name: string;
  code: string; // ISO_639-1, PL, EN etc. - we can consider using enum later
};

export type Tag = {
  id: number;
  name: string;
};

export type Message = {
  id: number;
  originalMessage: Message | null;
  content: string;
  language: Language;
  tags: Tag[];
};

// Types for creating resources

export type LanguageCreateData = {
  name: string;
  code: string;
};

export type TagCreateData = {
  name: string;
};

export type MessageCreateData = {
  originalMessage: Message | null;
  content: string;
  language: Language;
  // We need to discuss how we want to pass information about tags, list of ids for known ones and list of string for new ones?
  tags: Tag[];
};

export type MesssageFilters = {
  searchPhrase: string;
  language: Language | null;
  tags: Tag[];
};

// Types for updating resources

export type LanguageUpdate = Omit<Language, "id">;

export type TagUpdate = Omit<Tag, "id">;

export type MessageUpdate = Omit<Message, "id">;
