import { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import ic_pdf from '../Image/ic_pdf.svg';
import DocumentState from '../Store/DocumentState';
import annotationManager from '../../../web-pdf-lib/annotation/annotationManager';
import EID from "../../../web-pdf-lib/define/eventDefines";
import EventManager from "../../../web-pdf-lib/event/eventManager";

const Filename = () => {
  const { filename, setFilename } = DocumentState();

  useEffect(() => {
    const onDocumentLoaded = function() {
      setFilename(annotationManager.documentTitle);
    };
    EventManager.on(EID.onDocumentLoaded, onDocumentLoaded);
    return () => {
      EventManager.off(EID.onDocumentLoaded, onDocumentLoaded);
    }
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        marginLeft: '6px',
        '&:first-of-type': {
          marginLeft: '12px',
          '@media (max-width: 1023px)': {
            marginLeft: '0',
          },
        },
        '@media (max-width: 599px)': {
          display: 'none',
        },
      }}>
      <img src={ic_pdf} alt='file extension' />
      <Typography
        variant='body1'
        component='h1'
        sx={{
          marginLeft: '6px',
          color: 'text.primary',
          fontWeight: '500',
        }}>
        {filename}
      </Typography>
    </Box>
  );
};

export default Filename;
