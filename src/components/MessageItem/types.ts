import { Language, Message, Tag } from "api/types";

export type MessageItemProps = {
  id: number;
  originalMessage: Message | null;
  content: string;
  language: Language;
  tags: Tag[];
  isOriginal?: boolean;
  onEdit(): void;
  onDelete(): void;
  onRemoveTag(messageId: number, tagId: number): void;
};
