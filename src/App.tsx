import PdfViewerShadowDom from './Components/PdfViewer/PdfViewerShadowDom';
import PdfViewerFrame from './Components/PdfViewer/PdfViewerFrame';
// import WebPDF from './Components/PdfViewer/Content/WebPDF/WebPDF';
function App() {
  return <PdfViewerShadowDom parentLocale={'ko'} />;
  // return <PdfViewerFrame parentLocale={'ko'} cacheContainer={null} themeContainer={document.body} />;
  // return <WebPDF />;
}

export default App;
