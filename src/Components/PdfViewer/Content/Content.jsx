import WebPDF from './WebPDF';
import Box from '@mui/material/Box';
import PdfViewerState from '../Store/PdfViewerState';

const Content = () => {
  const { winSize, touchScreen, visibleHeader, headerHeight, visibleSidebar, sidebarWidth } = PdfViewerState();

  const minHeight = () => {
    if (visibleHeader) {
      return 'calc(' + winSize.height + 'px - ' + headerHeight + 'px)';
    } else {
      return winSize.height + 'px';
    }
  };

  const minWidth = () => {
    let minusWidth = 0;
    if (touchScreen === false) {
      if (visibleSidebar) {
        minusWidth += sidebarWidth;
      }
    }
    return 'calc(' + winSize.width + 'px - ' + minusWidth + 'px)';
  };

  return (
    <Box id={'pdf_viewer_content'} sx={{ minWidth: minWidth(), minHeight: minHeight() }}>
      <WebPDF />
    </Box>
  );
};

export default Content;