import { AppBar, Box, IconButton } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import DoneAllIcon from '@mui/icons-material/DoneAll';

const Header = () => {
  function btn2(event) {
    alert('버튼2');
  }

  return (
    <Box sx={{ display: 'flex', height: '64px' }}>
      <AppBar sx={{ display: 'flex', flexDirection: 'row', boxSizing: 'border-box', height: 'inherit', alignItems: 'center' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 'auto',
            marginRight: 0,
          }}>
          <IconButton
            sx={{ color: 'action.active', borderRadius: '10%' }}
            onClick={(event) => {
              alert('버튼1');
            }}>
            <CheckIcon />
          </IconButton>
          <IconButton
            sx={{ color: 'action.active', borderRadius: '10%' }}
            onClick={(event) => {
              btn2(event);
            }}>
            <DoneAllIcon />
          </IconButton>
        </Box>
      </AppBar>
    </Box>
  );
};

export default Header;
