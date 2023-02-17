import { Paper } from '@mui/material';
import Box from '@mui/material/Box';
import WebPDF from './WebPDF/WebPDF';

const Content = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px',
        gap: '10px',
        backgroundColor: '#efefef',
        height: '100%'
      }}>
      {/* <Paper variant='outlined' sx={{ width: '210mm', height: '297mm', backgroundColor: 'white' }} /> */}
      <WebPDF/>
    </Box>
  );
};

export default Content;
