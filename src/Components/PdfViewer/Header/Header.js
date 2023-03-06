import { AppBar, Box, IconButton } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import actionManager from '../../../web-pdf-lib/action/actionManager';

const Header = () => {
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
              actionManager.execute({name: "d_open"});
            }}>
            <CheckIcon titleAccess = "열기"/>
          </IconButton>
          <IconButton
            sx={{ color: 'action.active', borderRadius: '10%' }}
            onClick={(event) => {
              actionManager.execute({name: "a_highlight"});
            }}>
            <DoneAllIcon titleAccess = "형광펜" />
          </IconButton>
          <IconButton
            sx={{ color: 'action.active', borderRadius: '10%' }}
            onClick={(event) => {
              actionManager.execute({name: "e_zoom", value: '2.0'});
            }}>
            <DoneAllIcon titleAccess = "줌" />
          </IconButton>
        </Box>
      </AppBar>
    </Box>
  );
};

export default Header;
