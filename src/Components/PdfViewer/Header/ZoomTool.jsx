import { useEffect, useState } from 'react';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Box, Button, ListItemText, Typography } from '@mui/material';
import DocumentScannerOutlinedIcon from '@mui/icons-material/DocumentScannerOutlined';
import ExpandOutlinedIcon from '@mui/icons-material/ExpandOutlined';
import FitScreenOutlinedIcon from '@mui/icons-material/FitScreenOutlined';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PopoverMenu from '../Menu/PopoverMenu';
import DrawerMenu from '../Menu/DrawerMenu';
import PdfViewerState from '../Store/PdfViewerState';
import Tools from '../Tools/Tools.json';
import DividerVertical from '../DividerVertical/DividerVertical';

import webPdfLib, {AID} from '../../../web-pdf-lib/webPdfLib';

const ZoomTool = () => {
  const zoomTools = Tools.zoom;
  const { winSize } = PdfViewerState();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectZoom, setSelectZoom] = useState(undefined);

  useEffect(() => {
    if (selectZoom === undefined) {
      setSelectZoom('original');
    }

    // eslint-disable-next-line
  }, []);

  const menuList = () => {
    return (
      <MenuList>
        {Object.keys(zoomTools).map((key) => (
          <MenuItem
            key={key}
            onClick={() => {
              setAnchorEl(null);
              if (key !== 'full') {
                setSelectZoom(key);
              }
              webPdfLib.getActionManager().Execute(zoomTools[key].name, zoomTools[key].value);
            }}>
            <ListItemIcon>
              {key === 'original' ? <DocumentScannerOutlinedIcon fontSize={winSize.width >= 600 ? 'small' : 'medium'} /> : null}
              {key === 'height' ? <ExpandOutlinedIcon fontSize={winSize.width >= 600 ? 'small' : 'medium'} /> : null}
              {key === 'width' ? <ExpandOutlinedIcon fontSize={winSize.width >= 600 ? 'small' : 'medium'} sx={{ transform: 'rotate(90deg)' }} /> : null}
              {key === 'full' ? <FitScreenOutlinedIcon fontSize={winSize.width >= 600 ? 'small' : 'medium'} /> : null}
            </ListItemIcon>
            <Typography variant='body1' component='span' >
              {key === 'original' && '원본 크기로 보기'}
              {key === 'height' && '높이 사이즈'}
              {key === 'width' && '너비 사이즈'}
              {key === 'full' && '전체 화면'}
            </Typography>
          </MenuItem>
        ))}
      </MenuList>
    );
  };

  if (winSize.width === undefined) {
    return <></>;
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <DividerVertical />
      <Button
        sx={{
          color: 'action.active',
          width: winSize.width >= 1024 ? '220px' : '64px',
          height: '40px',
          px: winSize.width >= 1024 ? '12px' : '8px',
          backgroundColor: anchorEl === null ? '' : 'action.selected',
        }}
        onClick={(event) => {
          setAnchorEl(event.currentTarget);
        }}>
        <ListItemIcon sx={{ color: 'action.active', margin: 0, minWidth: 0 }}>
          {selectZoom === 'original' && <DocumentScannerOutlinedIcon />}
          {selectZoom === 'height' && <ExpandOutlinedIcon />}
          {selectZoom === 'width' && <ExpandOutlinedIcon sx={{ transform: 'rotate(90deg)' }} />}
          {selectZoom === 'full' && <FitScreenOutlinedIcon />}
        </ListItemIcon>
        {winSize.width >= 1024 ? (
          <ListItemText sx={{ color: 'text.primary', textAlign: 'center', flexShrink: '0' }}>
            <Typography variant='body1' component='span' sx={{ color: 'text.primary' }}>
              {selectZoom === 'original' && '원본 크기로 보기'}
              {selectZoom === 'height' && '높이 사이즈'}
              {selectZoom === 'width' && '너비 사이즈'}
              {selectZoom === 'full' && '전체 화면'}
            </Typography>
          </ListItemText>
        ) : (
          <></>
        )}
        <ListItemIcon sx={{ color: 'action.active', margin: 0, minWidth: 0 }}>{anchorEl === null ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}</ListItemIcon>
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

export default ZoomTool;
