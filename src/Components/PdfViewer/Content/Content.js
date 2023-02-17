import { Paper } from '@mui/material';
import Box from '@mui/material/Box';

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
      }}>
      <Paper variant='outlined' sx={{ width: '210mm', height: '297mm', backgroundColor: 'white' }} /> {/* pdf 1개 페이지 */}
    </Box>
  );
};

export default Content;
