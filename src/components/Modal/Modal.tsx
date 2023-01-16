import MuiModal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import type { ModalProps } from './types';
import {ModalContainer, ModalHeader, ModalTitle} from './styles'

export const Modal = ({title, isOpen, children, onClose}: ModalProps) => {
  return (
    <MuiModal open={isOpen} onClose={onClose}>
      <ModalContainer width={600}>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </ModalHeader>
        {children}
      </ModalContainer>
    </MuiModal>
  );
};
