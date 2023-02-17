import { Box } from '@mui/material';

const Container = ({ header, content }) => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          boxSizing: 'border-box',
          // height: 'inherit'
        }}>
        {header}
        {content}
      </Box>
    </>
  );
};

export default Container;
