import { useRef, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import _ from 'lodash';
import BackdropState from '../Store/BackdropState';
import Utils from '../Utils';

const PdfViewerDialog = ({ open, viewportResizing, handleClose, dialogTitle, dialogContent, cancel, ok, minWidth, maxWidth }) => {
  const { zoomScale } = Utils();
  const dialogRef = useRef(null);
  const dialogPaperRef = useRef(null);
  const { backdropClose } = BackdropState();

  useEffect(() => {
    lazyAdjustStyle();
    backdropClose(0);

    // eslint-disable-next-line
  }, [open, viewportResizing]);

  const lazyAdjustStyle = _.debounce(() => {
    if (dialogPaperRef?.current !== null) {
      if (open === false) {
        dialogPaperRef.current.style.visibility = 'hidden';
      } else {
        dialogPaperRef.current.style.top = window.visualViewport.offsetTop + (window.visualViewport.height / 2 - (getDialogHeight() * zoomScale()) / 2) + 'px';
        dialogPaperRef.current.style.left = window.visualViewport.offsetLeft + (window.visualViewport.width / 2 - (getDialogWidth() * zoomScale()) / 2) + 'px';
        dialogPaperRef.current.style.visibility = 'visible';
      }
    }
  }, 100);

  const getDialogWidth = () => {
    return dialogPaperRef?.current?.offsetWidth;
  };

  const getDialogHeight = () => {
    return dialogPaperRef?.current?.offsetHeight;
  };

  return (
    <Dialog
      ref={dialogRef}
      open={open}
      onClose={handleClose}
      PaperProps={{
        ref: dialogPaperRef,
        sx: {
          visibility: 'hidden',
          backgroundColor: 'background.paper',
          color: 'text.primary',
          position: 'fixed',
          transformOrigin: '0 0',
          transform: 'scale(' + zoomScale() + ')',
          top: window.visualViewport.offsetTop + (window.visualViewport.height / 2 - (getDialogHeight() * zoomScale()) / 2) + 'px',
          left: window.visualViewport.offsetLeft + (window.visualViewport.width / 2 - (getDialogWidth() * zoomScale()) / 2) + 'px',
          width: maxWidth === undefined ? '444px' : maxWidth,
          maxWidth: 'calc(100% - 24px)',
          maxHeight: 'calc(100% - 24px)',
          margin: 0,
          boxSizing: 'border-box',
          '@media (max-width: 599px)': {
            width: minWidth === undefined ? '320px' : minWidth,
          },
        },
      }}>
      <DialogTitle
        variant='h6'
        sx={{
          alignSelf: 'stretch',
          flexGrow: 0,
          textAlign: 'left',
          color: 'text.primary',
        }}>
        {dialogTitle}
      </DialogTitle>
      <DialogContent sx={{ flexShrink: '0' }}>{dialogContent}</DialogContent>
      <DialogActions>
        {cancel === undefined ? <></> : <Button onClick={handleClose}>취소</Button>}
        {ok === undefined ? (
          <></>
        ) : (
          <Button onClick={ok} autoFocus color='secondary'>
            {'확인'}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default PdfViewerDialog;
