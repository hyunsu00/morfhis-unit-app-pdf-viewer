import { useEffect, useState } from 'react';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Box, Button, ListItemText } from '@mui/material';
import Typography from '@mui/material/Typography';
import DocumentScannerOutlinedIcon from '@mui/icons-material/DocumentScannerOutlined';
import ExpandOutlinedIcon from '@mui/icons-material/ExpandOutlined';
import ZoomOutMapOutlinedIcon from '@mui/icons-material/ZoomOutMapOutlined';
import FitScreenOutlinedIcon from '@mui/icons-material/FitScreenOutlined';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PopoverMenu from '../Menu/PopoverMenu';
import DrawerMenu from '../Menu/DrawerMenu';
import PdfViewerState from '../Store/PdfViewerState';
import actionManager from '../../../web-pdf-lib/action/actionManager';

const ContentFit = () => {
  const { winSize, viewportResizing } = PdfViewerState();
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    setAnchorEl(null);

    // eslint-disable-next-line
  }, [viewportResizing]);

  const fitMenuButton = (menu) => {
    return (
      <>
        <ListItemIcon sx={{ color: 'action.active', margin: 0, minWidth: 0 }}>
          {menu === 'original' && <DocumentScannerOutlinedIcon />}
          {menu === 'height' && <ExpandOutlinedIcon />}
          {menu === 'width' && <ZoomOutMapOutlinedIcon />}
          {menu === 'full' && <FitScreenOutlinedIcon />}
        </ListItemIcon>
        {winSize.width >= 1024 ? (
          <ListItemText sx={{ color: 'text.primary', textAlign: 'center', flexShrink: '0' }}>
            <Typography variant='body1' component='span' sx={{ color: 'text.primary' }}>
              {menu === 'original' && '원본 크기로 보기'}
              {menu === 'height' && '높이 사이즈'}
              {menu === 'width' && '너비 사이즈'}
              {menu === 'full' && '전체 화면'}
            </Typography>
          </ListItemText>
        ) : (
          <></>
        )}
        <ListItemIcon sx={{ color: 'action.active', margin: 0, minWidth: 0 }}>{anchorEl === null ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}</ListItemIcon>
      </>
    );
  };

  const fitMenuItem = (menu) => {
    const textStyle = {
      marginLeft: winSize.width >= 600 ? '8px' : '32px',
      textAlign: 'left',
      color: 'text.primary',
    };

    return (
      <MenuItem
        sx={{ height: winSize.width >= 600 ? '36px' : '56px' }}
        onClick={() => {
          setAnchorEl(null);
          if (menu === 'original') {
            actionManager.execute({name:'e_zoom', value: 'page-actual'});
          } else if (menu === 'height') {
            actionManager.execute({name:'e_zoom', value: 'page-height'});
          } else if (menu === 'width') {
            actionManager.execute({name:'e_zoom', value: 'page-width'});
          } else if (menu === 'full') {
            actionManager.execute({name:'e_show_mode'});
          }
        }}>
        <ListItemIcon sx={{ color: 'action.active' }}>
          {menu === 'original' && <DocumentScannerOutlinedIcon fontSize={winSize.width >= 600 ? 'small' : 'medium'} />}
          {menu === 'height' && <ExpandOutlinedIcon fontSize={winSize.width >= 600 ? 'small' : 'medium'} />}
          {menu === 'width' && <ZoomOutMapOutlinedIcon fontSize={winSize.width >= 600 ? 'small' : 'medium'} />}
          {menu === 'full' && <FitScreenOutlinedIcon fontSize={winSize.width >= 600 ? 'small' : 'medium'} />}
        </ListItemIcon>
        <Typography variant='body1' component='span' sx={textStyle}>
          {menu === 'original' && '원본 크기로 보기'}
          {menu === 'height' && '높이 사이즈'}
          {menu === 'width' && '너비 사이즈'}
          {menu === 'full' && '전체 화면'}
        </Typography>
      </MenuItem>
    );
  };

  const menuList = () => {
    return (
      <MenuList>
        {fitMenuItem('original')}
        {fitMenuItem('height')}
        {fitMenuItem('width')}
        {fitMenuItem('full')}
      </MenuList>
    );
  };

  if (winSize.width === undefined) {
    return <></>;
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Button
        onClick={(event) => {
          setAnchorEl(event.currentTarget);
        }}
        sx={{
          color: 'action.active',
          width: winSize.width >= 1024 ? '220px' : '64px',
          height: '40px',
          px: winSize.width >= 1024 ? '12px' : '8px',
          backgroundColor: anchorEl === null ? '' : 'action.selected',
        }}>
        {fitMenuButton('original')}
      </Button>
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
          width={220}
          height='auto'
          sx={{ mt: '4px' }}
        />
      ) : (
        <DrawerMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} menuList={menuList()} width={winSize.width} height={240} />
      )}
    </Box>
  );
};

export default ContentFit;
