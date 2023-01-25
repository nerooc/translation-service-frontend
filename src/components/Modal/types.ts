export type ModalProps = {
  title: string;
  isOpen: boolean;
  width?: number;
  saveButtonLabel?: string;
  children: React.ReactElement;
  onCancel(): void;
  onSave(): void;
};
