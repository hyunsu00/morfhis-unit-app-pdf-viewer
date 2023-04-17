import { useEffect, useState } from 'react';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import FileOpenOutlinedIcon from '@mui/icons-material/FileOpenOutlined';
import PrintOutlined from '@mui/icons-material/PrintOutlined';
import FileDownloadOutlined from '@mui/icons-material/FileDownloadOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import PopoverMenu from '../Menu/PopoverMenu';
import DrawerMenu from '../Menu/DrawerMenu';
import PdfViewerState from '../Store/PdfViewerState';
import ActionManager from '../../../web-pdf-lib/action/actionManager';
import AID from "../../../web-pdf-lib/define/actionDefines";

const MoreMenu = () => {
  const { winSize, viewportResizing } = PdfViewerState();
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    setAnchorEl(null);

    // eslint-disable-next-line
  }, [viewportResizing]);

  const menuList = () => {
    const textStyle = {
      marginLeft: winSize.width >= 600 ? '8px' : '32px',
      textAlign: 'left',
      color: 'text.primary',
    };

    return (
      <MenuList>
        <MenuItem
          sx={{ height: winSize.width >= 600 ? '36px' : '56px' }}
          onClick={() => {
            setAnchorEl(null);
            ActionManager.Execute(AID.OPEN_FILE);
          }}>
          <ListItemIcon sx={{ color: 'action.active' }}>
            <FileOpenOutlinedIcon fontSize={winSize.width >= 600 ? 'small' : 'medium'} />
          </ListItemIcon>
          <Typography variant='body1' component='span' sx={textStyle}>
            열기
          </Typography>
        </MenuItem>
        <MenuItem
          sx={{ height: winSize.width >= 600 ? '36px' : '56px' }}
          onClick={() => {
            setAnchorEl(null);
            ActionManager.Execute(AID.PRINT);
          }}>
          <ListItemIcon sx={{ color: 'action.active' }}>
            <PrintOutlined fontSize={winSize.width >= 600 ? 'small' : 'medium'} />
          </ListItemIcon>
          <Typography variant='body1' component='span' sx={textStyle}>
            인쇄
          </Typography>
        </MenuItem>
        <MenuItem
          sx={{ height: winSize.width >= 600 ? '36px' : '56px' }}
          onClick={() => {
            setAnchorEl(null);
            ActionManager.Execute(AID.DOWNLOAD);
          }}>
          <ListItemIcon sx={{ color: 'action.active' }}>
            <FileDownloadOutlined fontSize={winSize.width >= 600 ? 'small' : 'medium'} />
          </ListItemIcon>
          <Typography variant='body1' component='span' sx={textStyle}>
            다운로드
          </Typography>
        </MenuItem>
      </MenuList>
    );
  };

  if (winSize.width === undefined) {
    return <></>;
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <IconButton
        sx={{ color: 'action.active', borderRadius: '4px', margin: '4px', backgroundColor: anchorEl === null ? '' : 'action.selected' }}
        onClick={(event) => {
          setAnchorEl(event.currentTarget);
        }}>
        <MoreVertIcon />
      </IconButton>
      {winSize.width >= 600 ? (
        <PopoverMenu
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          menuList={menuList()}
          width={140}
          height='auto'
          sx={{ mt: '4px' }}
        />
      ) : (
        <DrawerMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} menuList={menuList()} width={winSize.width} height={184} />
      )}
    </Box>
  );
};

export default MoreMenu;
