export type ModalProps = {
  title: string;
  isOpen: boolean;
  children: React.ReactElement;
  onClose(): void;
}
