import { useEffect, useRef } from 'react';
import TextField from '@mui/material/TextField';
import DialogContentText from '@mui/material/DialogContentText';
import DialogState from '../Store/DialogState';
import PdfViewerDialog from './PdfViewerDialog';
import PdfViewerState from '../Store/PdfViewerState';

const PasswordDialog = () => {
  const passwordInputRef = useRef(null);
  const { passwordDialogOpen, setPasswordDialogOpen, passwordDialogErrorCode, passwordDialogPassword, setPasswordDialogPassword, passwordDialogPasswordInputCount, setPasswordDialogPasswordInputCount } = DialogState();
  const { viewportResizing } = PdfViewerState();

  useEffect(() => {
    if (passwordInputRef.current !== null && passwordDialogPassword !== undefined) {
      passwordInputRef.current.value = passwordDialogPassword;
    }

    // eslint-disable-next-line
  }, [open]);

  const handleClose = () => {
    setPasswordDialogOpen(false);
  };

  const handleOk = () => {
    let newPassword = passwordInputRef.current.value;
    let newPasswordDialogPasswordInputCount = passwordDialogPasswordInputCount + 1;
    setPasswordDialogPassword(newPassword);
    setPasswordDialogPasswordInputCount(newPasswordDialogPasswordInputCount);
    handleClose();
  };

  const dialogContent = () => {
    return (
      <>
        <DialogContentText
          variant='body1'
          sx={{
            alignSelf: 'stretch',
            flexGrow: 0,
            textAlign: 'left',
            color: 'text.secondary',
          }}>
          {'문서 비밀번호를 입력하세요.'}
        </DialogContentText>
        <TextField
          error={passwordDialogErrorCode === 'F032'}
          sx={{
            alignSelf: 'stretch',
            flexGrow: 0,
            textAlign: 'left',
            color: 'text.secondary',
          }}
          inputRef={passwordInputRef}
          margin='dense'
          label={'비밀번호'}
          type='password'
          fullWidth
          helperText={passwordDialogErrorCode === 'F032' ? '비밀번호가 일치하지 않습니다.' : ''}
          variant='standard'
          color='secondary'
        />
      </>
    );
  };

  return <PdfViewerDialog open={passwordDialogOpen} viewportResizing={viewportResizing} handleClose={handleClose} dialogTitle={'암호 문서'} dialogContent={dialogContent()} cancel={handleClose} ok={handleOk} />;
};

export default PasswordDialog;
