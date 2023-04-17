import ActionManager from '../../../web-pdf-lib/action/actionManager';
import AID from "../../../web-pdf-lib/define/actionDefines";
import { useEffect, useState } from 'react';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Box, Button, ButtonGroup } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined';
import HorizontalRuleOutlinedIcon from '@mui/icons-material/HorizontalRuleOutlined';
import RectangleOutlinedIcon from '@mui/icons-material/RectangleOutlined';
import FormatUnderlinedOutlinedIcon from '@mui/icons-material/FormatUnderlinedOutlined';
import FormatStrikethroughOutlinedIcon from '@mui/icons-material/FormatStrikethroughOutlined';
import StickyNote2OutlinedIcon from '@mui/icons-material/StickyNote2Outlined';
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined';
import PopoverMenu from '../Menu/PopoverMenu';
import DrawerMenu from '../Menu/DrawerMenu';
import PdfViewerState from '../Store/PdfViewerState';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import Tools from '../Tools/Tools.json';

const PenTool = () => {
  const drawTools = Tools.draw;
  const { winSize, viewportResizing } = PdfViewerState();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectDrawTool, setSelectDrawTool] = useState('a_draw');

  useEffect(() => {
    setAnchorEl(null);

    // eslint-disable-next-line
  }, [viewportResizing]);

  const menuList = () => {
    return (
      <MenuList>
        {Object.keys(drawTools).map((key) => (
          <MenuItem
            key={key}
            onClick={() => {
              setAnchorEl(null);
              switch(key) 
              {
              case 'a_draw':
              case 'a_line':
              case 'a_area':
              case 'a_underline':
              case 'a_strikeout':
              case 'a_highlight':
              case 'a_point':
              case 'a_text':
                ActionManager.Execute(AID.SELECT_DRAW_TOOL, key);
                break;
              default:
                break;
              }
              setSelectDrawTool(key);
            }}>
            <ListItemIcon>
              {key === 'a_draw' ? <EditOutlinedIcon /> : null}
              {key === 'a_line' ? <HorizontalRuleOutlinedIcon /> : null}
              {key === 'a_area' ? <RectangleOutlinedIcon /> : null}
              {key === 'a_underline' ? <FormatUnderlinedOutlinedIcon /> : null}
              {key === 'a_strikeout' ? <FormatStrikethroughOutlinedIcon /> : null}
              {key === 'a_highlight' ? <AutoFixHighOutlinedIcon /> : null}
              {key === 'a_point' ? <StickyNote2OutlinedIcon /> : null}
              {key === 'a_text' ? <TextSnippetOutlinedIcon /> : null}
            </ListItemIcon>
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
      <ButtonGroup variant='contained'>
        <Button
          onClick={() => {
            ActionManager.Execute(AID.SELECT_DRAW_TOOL, selectDrawTool);
          }}>
          {selectDrawTool === 'a_draw' ? <EditOutlinedIcon /> : null}
          {selectDrawTool === 'a_line' ? <HorizontalRuleOutlinedIcon /> : null}
          {selectDrawTool === 'a_area' ? <RectangleOutlinedIcon /> : null}
          {selectDrawTool === 'a_underline' ? <FormatUnderlinedOutlinedIcon /> : null}
          {selectDrawTool === 'a_strikeout' ? <FormatStrikethroughOutlinedIcon /> : null}
          {selectDrawTool === 'a_highlight' ? <AutoFixHighOutlinedIcon /> : null}
          {selectDrawTool === 'a_point' ? <StickyNote2OutlinedIcon /> : null}
          {selectDrawTool === 'a_text' ? <TextSnippetOutlinedIcon /> : null}
        </Button>
        <Button
          size='small'
          onClick={(event) => {
            setAnchorEl(event.currentTarget);
          }}>
          <ArrowDropDownOutlinedIcon />
        </Button>
      </ButtonGroup>
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
          width={56}
          height='auto'
          sx={{ mt: '4px' }}
        />
      ) : (
        <DrawerMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} menuList={menuList()} width={winSize.width} height={240} />
      )}
    </Box>
  );
};

export default PenTool;
