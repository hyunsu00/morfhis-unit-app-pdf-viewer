import PanToolIcon from '@mui/icons-material/PanTool';
import HighlightAltIcon from '@mui/icons-material/HighlightAlt';
import { Box, Button, ButtonGroup } from '@mui/material';
import webPdfLib, { ACTION_ID, CURSOR_TYPE } from '../../../web-pdf-lib/webPdfLib';
import { useState } from 'react';
import PdfViewerState from '../Store/PdfViewerState';


const Cursor = () => {
  // const { undoRedoLength } = PdfViewerState();

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <ButtonGroup variant='contained'>
        <Button
          // disabled={undoRedoLength.undo === 0}
          onClick={() => {
            webPdfLib.getActionManager().Execute(ACTION_ID.SELECT_CURSOR, CURSOR_TYPE.HAND);
          }}>
          <PanToolIcon />
        </Button>
        <Button
          // disabled={undoRedoLength.redo === 0}
          onClick={() => {
            webPdfLib.getActionManager().Execute(ACTION_ID.SELECT_CURSOR, CURSOR_TYPE.SELECT);
          }}>
          <HighlightAltIcon />
        </Button>
      </ButtonGroup>





    </Box >
  );
};

export default Cursor;
