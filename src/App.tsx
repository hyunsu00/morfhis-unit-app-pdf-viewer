import PdfViewerShadowDom from './Components/PdfViewer/PdfViewerShadowDom';
import PdfViewerFrame from './Components/PdfViewer/PdfViewerFrame';

function App() {
  // return <PdfViewerShadowDom parentLocale={'ko'} />;
  return <PdfViewerFrame parentLocale={'ko'} cacheContainer={null} themeContainer={null} />;
}

export default App;
