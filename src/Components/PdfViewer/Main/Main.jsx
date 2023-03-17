import Box from '@mui/material/Box';

const Main = ({ header, content }) => {
  return (
    <Box id={'pdf_viewer_main'} sx={{ backgroundColor: 'background.system', display: 'flex', flexDirection: 'column' }}>
      {header}
      {content}
    </Box>
  );
};

export default Main;
