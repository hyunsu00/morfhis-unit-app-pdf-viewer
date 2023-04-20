import { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import ic_pdf from '../Image/ic_pdf.svg';
import DocumentState from '../Store/DocumentState';

import webPdfLib, {EVENT_ID} from '../../../web-pdf-lib/webPdfLib';

const Filename = () => {
  const { filename, setFilename } = DocumentState();

  useEffect(() => {
    const onDocumentLoaded = function() {
      setFilename(webPdfLib.getTitle());
    };
    webPdfLib.getEventManager().on(EVENT_ID.DOCUMENT_LOADED, onDocumentLoaded);
    return () => {
      webPdfLib.getEventManager().off(EVENT_ID.DOCUMENT_LOADED, onDocumentLoaded);
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
