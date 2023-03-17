import { Brightness6Outlined } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import DividerVertical from '../DividerVertical/DividerVertical';
import PdfViewerState from '../Store/PdfViewerState';

const SelectTheme = () => {
  const { selectTheme, setSelectTheme } = PdfViewerState();
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <DividerVertical />
      <IconButton
        sx={{ color: 'action.active', borderRadius: '4px', margin: '4px' }}
        onClick={() => {
          setSelectTheme(selectTheme === 'light' ? 'dark' : 'light');
        }}>
        <Brightness6Outlined />
      </IconButton>
    </Box>
  );
};

export default SelectTheme;
