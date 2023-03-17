import DialogState from '../Store/DialogState';
import PdfViewerDialog from './PdfViewerDialog';
import DialogContentText from '@mui/material/DialogContentText';
import PdfViewerState from '../Store/PdfViewerState';

const ErrorDialog = () => {
  const { errorDialogOpen, setErrorDialogOpen, errorDialogCode, defaultDialogTitle, defaultDialogMessage } = DialogState();
  const { viewportResizing } = PdfViewerState();

  const handleClose = () => {
    setErrorDialogOpen(false);
  };

  const handleOk = () => {
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
          Error Code : {errorDialogCode}
        </DialogContentText>
        <DialogContentText
          variant='body1'
          sx={{
            alignSelf: 'stretch',
            flexGrow: 0,
            textAlign: 'left',
            color: 'text.secondary',
          }}>
          Error Message: {defaultDialogMessage}
        </DialogContentText>
      </>
    );
  };

  return <PdfViewerDialog open={errorDialogOpen} viewportResizing={viewportResizing} handleClose={handleClose} dialogTitle={defaultDialogTitle} dialogContent={dialogContent()} cancel={undefined} ok={handleOk} />;
};

export default ErrorDialog;
