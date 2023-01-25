import { MesssageFilters } from "api/types";
import { ModalProps } from "components/Modal/types";

export type MessageFiltersProps = {
  filters: MesssageFilters;
  onSubmit(data: MesssageFilters): void;
} & Omit<ModalProps, "onSave" | "children">;
