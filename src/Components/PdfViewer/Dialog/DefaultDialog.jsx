import DialogState from '../Store/DialogState';
import PdfViewerDialog from './PdfViewerDialog';
import DialogContentText from '@mui/material/DialogContentText';
import PdfViewerState from '../Store/PdfViewerState';

const DefaultDialog = () => {
  const { defaultDialogOpen, setDefaultDialogOpen, defaultDialogTitle, defaultDialogMessage } = DialogState();
  const { viewportResizing } = PdfViewerState();

  const handleClose = () => {
    setDefaultDialogOpen(false);
  };

  const handleOk = () => {
    handleClose();
  };

  const dialogContent = () => {
    return (
      <DialogContentText
        variant='body1'
        sx={{
          alignSelf: 'stretch',
          flexGrow: 0,
          textAlign: 'left',
          color: 'text.secondary',
        }}>
        {defaultDialogMessage}
      </DialogContentText>
    );
  };

  return <PdfViewerDialog open={defaultDialogOpen} viewportResizing={viewportResizing} handleClose={handleClose} dialogTitle={defaultDialogTitle} dialogContent={dialogContent()} cancel={undefined} ok={handleOk} />;
};

export default DefaultDialog;
