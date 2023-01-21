import React from "react";
import { Language, Tag } from "api/types";

export type MessageCardProps = {
  originalMessage: number;
  content: string;
  language: Language;
  tags: Tag[];
};
