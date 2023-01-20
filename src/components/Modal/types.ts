export type ModalProps = {
  title: string;
  isOpen: boolean;
  width?: number;
  children: React.ReactElement;
  onCancel(): void;
  onSave(): void;
}
