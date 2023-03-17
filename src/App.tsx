import PdfViewerFrame from './Components/PdfViewer/PdfViewerFrame';
import { useEffect, useState } from 'react';

function App() {
  const [props, setProps] = useState(undefined);

  useEffect(() => {
    initProps().then(() => {});
  }, []);

  async function initProps() {
    const props = {
      parentLocale: 'ko',
    };

    // @ts-ignore
    setProps(props);
  }

  if (props === undefined) {
    return <div>Loading...</div>;
  }

  return <PdfViewerFrame props={props} />;
}

export default App;
