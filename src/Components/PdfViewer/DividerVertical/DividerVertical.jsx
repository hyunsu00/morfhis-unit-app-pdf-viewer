import Divider from '@mui/material/Divider';
import { Box } from '@mui/material';

const DividerVertical = ({ display, height, marginLeft, marginRight }) => {
  return (
    <Box
      sx={{
        display: display === undefined ? 'flex' : display,
        height: height === undefined ? '24px' : height,
        '& .MuiDivider-root': {
          marginLeft: marginLeft === undefined ? '6px' : marginLeft,
          marginRight: marginRight === undefined ? '6px' : marginRight,
        },
      }}>
      <Divider orientation='vertical' flexItem />
    </Box>
  );
};

export default DividerVertical;
