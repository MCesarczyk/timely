import { forwardRef, useState } from 'react';
import clsx from 'clsx';
import Modal from '@mui/base/Modal';
import styled from 'styled-components';

import { CloseIcon } from './CloseIcon';

export const AppModal = ({ children }: { children: JSX.Element }) => {
  const [open, setOpen] = useState(true);

  const handleClose = () => setOpen(false);

  return (
    <StyledModal
      aria-labelledby="Day details"
      open={open}
      onClose={handleClose}
      slots={{ backdrop: StyledBackdrop }}
    >
      <StyledModalContainer>
        <CloseIcon onClick={handleClose} />
        {children}
      </StyledModalContainer>
    </StyledModal>
  );
};

const Backdrop = forwardRef<
  HTMLDivElement,
  { open?: boolean; className: string; ownerState: any }
>((props, ref) => {
  const { open, className, ownerState, ...other } = props;
  return (
    <div
      className={clsx({ 'MuiBackdrop-open': open }, className)}
      ref={ref}
      {...other}
    />
  );
});

const StyledModal = styled(Modal)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const StyledModalContainer = styled.div`
  min-width: 600px;
  border-radius: 10px;
  padding: 30px;
  background-color: white;
  box-shadow: 0px 2px 24px #383838;
  position: relative;
  max-height: 100vh;
  overflow-y: auto;
`;
