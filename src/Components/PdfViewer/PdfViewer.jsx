import './PdfViewer.scss';
import Container from './Container/Container';
import Header from './Header/Header';
import Content from './Content/Content';
import Sidebar from './Sidebar/Sidebar';
import { Box } from '@mui/material';
import PdfViewerState from './Store/PdfViewerState';
import WebPDF from './WebPDF';
import { useEffect } from 'react';

const PdfViewer = () => {
  const { winSize } = PdfViewerState();
  const { initialize } = WebPDF();

  useEffect(() => {
    initialize(`${process.env.PUBLIC_URL}/libs`, `${process.env.PUBLIC_URL}/libs/pdfjs/web/compressed.tracemonkey-pldi-09.pdf`);
    // initialize(`${process.env.PUBLIC_URL}/libs`, undefined);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      id={'pdf_viewer'}
      className='pdf-viewer'
      sx={{
        display: 'flex',
        flexDirection: 'row',
        margin: 0,
        padding: 0,
        flexGrow: 0,
        flexShrink: 0,
        boxSizing: 'border-box',
        backgroundColor: 'background.system',
        width: winSize.width + 'px',
      }}>
      <Container header={<Header />} content={<Content />} sidebar={<Sidebar />} />
    </Box>
  );
};

export default PdfViewer;
