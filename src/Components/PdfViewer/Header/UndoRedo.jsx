import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import { Box, Button, ButtonGroup } from '@mui/material';
import webPdfLib, { ACTION_ID } from '../../../web-pdf-lib/webPdfLib';
import { useState } from 'react';
import PdfViewerState from '../Store/PdfViewerState';


const UndoRedo = () => {
  const { undoRedoLength } = PdfViewerState();

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <ButtonGroup variant='contained'>
        <Button
          disabled={undoRedoLength.undo === 0}
          onClick={() => {
            webPdfLib.getActionManager().Execute(ACTION_ID.UNDO);
            console.log('webPdfLib.UndoRedo.undo_length=' + webPdfLib?.gUndoRedoManager?._undoStack?.length);
          }}>
          <UndoIcon />
        </Button>
        <Button
          disabled={undoRedoLength.redo === 0}
          onClick={() => {
            webPdfLib.getActionManager().Execute(ACTION_ID.REDO);
          }}>
          <RedoIcon />
        </Button>
      </ButtonGroup>





    </Box >
  );
};

export default UndoRedo;
