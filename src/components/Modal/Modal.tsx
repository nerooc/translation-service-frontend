import MuiModal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import type { ModalProps } from './types';
import {ModalContainer, ModalControls, ModalHeader, ModalTitle, Button} from './styles'

export const Modal = ({title, isOpen, width = 600, children, onCancel, onSave}: ModalProps) => {
  const handleSave = () => {
    onSave();
    onCancel();
  }

  return (
    <MuiModal open={isOpen} onClose={onCancel}>
      <ModalContainer width={width}>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <IconButton onClick={onCancel}>
            <CloseIcon />
          </IconButton>
        </ModalHeader>
        {children}
        <ModalControls>
          <Button variant='outlined' onClick={onCancel}>Cancel</Button>
          <Button variant='contained' onClick={handleSave}>Save</Button>
        </ModalControls>
      </ModalContainer>
    </MuiModal>
  );
};
