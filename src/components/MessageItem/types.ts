import { Language, Tag } from "api/types";

export type MessageItemProps = {
  id: number;
  originalMessage: number | null;
  content: string;
  language: Language;
  tags: Tag[];
  onEdit(): void;
  onDelete(): void;
  onRemoveTag(messageId: number, tagId: number): void;
};
