import { Message } from "api/types";

import { ModalProps } from "components/Modal/types";

export type MessageFormProps = {
  message?: Partial<Omit<Message, 'id'>>;
  onSubmit(data: Omit<Message, 'id'>): void;
} & Omit<ModalProps, 'onSave' | 'children'>
