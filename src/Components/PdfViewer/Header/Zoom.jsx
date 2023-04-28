import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import HighlightAltIcon from '@mui/icons-material/HighlightAlt';
import { Box, Button, ButtonGroup } from '@mui/material';
import webPdfLib, { ACTION_ID, CURSOR_TYPE } from '../../../web-pdf-lib/webPdfLib';
import { useState } from 'react';
import PdfViewerState from '../Store/PdfViewerState';


const Zoom = () => {
  // const { undoRedoLength } = PdfViewerState();

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <ButtonGroup variant='contained'>
        <Button
          onClick={() => {
            // webPdfLib.getActionManager().Execute(ACTION_ID.ZOOM, 'minus');
          }}>
          <RemoveCircleOutlineIcon />
        </Button>
        <Button
          onClick={() => {
            // webPdfLib.getActionManager().Execute(ACTION_ID.ZOOM, 'plus');
          }}>
          <AddCircleOutlineIcon />
        </Button>
      </ButtonGroup>





    </Box >
  );
};

export default Zoom;
