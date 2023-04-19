import MenuIcon from '@mui/icons-material/Menu';
import VerticalSplitOutlinedIcon from '@mui/icons-material/VerticalSplitOutlined';
import { AppBar, Box, IconButton } from '@mui/material';
import PdfViewerState from '../Store/PdfViewerState';
import Utils from '../Utils';
import ZoomTool from './ZoomTool';
import Filename from './Filename';
import MoreMenu from './MoreMenu';
import Pagination from './Pagination';
import SelectTheme from './SelectTheme';
import PenTool from './PenTool';

import webPdfLib, {AID, FIND_TYPE} from '../../../web-pdf-lib/webPdfLib';

const Header = () => {
  const { zoomScale } = Utils();
  const { winSize, viewportResizing, headerHeight, visibleSidebar, setVisibleSidebar, headerZIndex } = PdfViewerState();

  return (
    <Box id={'pdf_viewer_header'} sx={{ userSelect: 'none', height: headerHeight + 'px' }}>
      <AppBar
        sx={{
          backgroundColor: 'background.header',
          visibility: viewportResizing ? 'hidden' : 'visible',
          flexDirection: 'column',
          alignItems: 'center',
          height: headerHeight + 'px',
          width: winSize.width + 'px',
          position: 'fixed',
          transformOrigin: '0 0',
          transform: 'scale(' + zoomScale() + ')',
          top: window.visualViewport.offsetTop,
          left: window.visualViewport.offsetLeft,
          flexGrow: 0,
          flexShrink: 0,
          zIndex: headerZIndex,
          color: 'action.active',
          borderBottom: 'solid',
          borderWidth: '1px',
          borderColor: 'divider',
          overscrollBehavior: 'contain', // 스크롤 액션이 부모쪽으로 넘어가는것을 차단
          boxSizing: 'border-box',
          paddingInline: '12px',
        }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
          <IconButton
            sx={{ color: 'action.active', borderRadius: '4px', margin: '4px' }}
            onClick={() => {
              webPdfLib.getActionManager().Execute(AID.THUMBNAIL_VIEW);
            }}>
            <MenuIcon />
          </IconButton>
          <Filename />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: 'auto',
              marginRight: 0,
              '@media (max-width: 599px)': {
                flexGrow: '1',
              },
            }}>
            <Pagination />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 'auto',
              }}>
              <ZoomTool />
              <SelectTheme />
              <IconButton
                sx={{ color: 'action.active', borderRadius: '4px', margin: '4px' }}
                onClick={() => {
                  setVisibleSidebar(!visibleSidebar);
                  // if (visibleSidebar) {
                  //   const value = webPdfLib.getValueGenerator().createFindValue(FIND_TYPE.FIND_AGAIN, "Trace", false, false, true, false);
                  //   webPdfLib.getActionManager().Execute(AID.FIND_OPEN, value); 
                  // } else {
                  //   webPdfLib.getActionManager().Execute(AID.FIND_CLOSE); 
                  // }
                }}>
                <VerticalSplitOutlinedIcon />
              </IconButton>
              <MoreMenu />
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
          <PenTool />
        </Box>
      </AppBar>
    </Box>
  );
};

export default Header;
