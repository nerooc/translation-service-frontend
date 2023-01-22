import React from "react";
import { Language, Tag } from "api/types";

export type MessageCardProps = {
  id: number;
  originalMessage: number;
  content: string;
  language: Language;
  tags: Tag[];
};
