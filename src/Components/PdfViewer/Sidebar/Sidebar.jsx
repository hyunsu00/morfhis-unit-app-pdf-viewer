import Box from '@mui/material/Box';
import PdfViewerState from '../Store/PdfViewerState';
import Utils from '../Utils';
import WebPDFSidebar from './WebPDFSidebar';

const Sidebar = () => {
  const { zoomScale } = Utils();
  const { winSize, touchScreen, viewportResizing, visibleSidebar, sidebarWidth, headerHeight, headerZIndex } = PdfViewerState();

  return (
    <Box
      id={'pdf_viewer_side_bar'}
      sx={{
        userSelect: 'none',
        backgroundColor: 'background.sidebar',
        display: visibleSidebar ? 'flex' : 'none',
        visibility: viewportResizing ? 'hidden' : 'visible',
        width: sidebarWidth,
        height: winSize.height + 'px',
        position: winSize.width < 600 || touchScreen ? 'fixed' : 'sticky',
        transformOrigin: '0 0',
        transform: 'scale(' + zoomScale() + ')',
        top: window.visualViewport.offsetTop,
        left: window.visualViewport.offsetLeft + window.visualViewport.width - sidebarWidth * zoomScale(),
        flexGrow: 0,
        flexShrink: 0,
        boxSizing: 'border-box',
        border: 'solid',
        borderWidth: '1px',
        borderColor: 'divider',
        paddingTop: headerHeight + 'px',
        zIndex: headerZIndex - 1,
        overscrollBehavior: 'contain', // 스크롤 액션이 부모쪽으로 넘어가는것을 차단
      }}>
      <WebPDFSidebar />
    </Box>
  );
};

export default Sidebar;
