import { useEffect, useRef } from "react";

import webPdfLib from '../../../web-pdf-lib/webPdfLib';

function WebPDFSidebar() {
  console.log("function WebPDFSidebar())");

  // componentDidMount with useEffect
  useEffect(() => {
    console.log("WebPDFSidebar.componentDidMount[Function]");
    
    // componentWillUnmount with useEffect
    return () => {
      console.log("WebPDFSidebar.componentWillUnmount[Function]");
    };
  }, []);

  // componentDidUpdate with useEffect
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      console.log("WebPDFSidebar.componentDidUpdate[Function]");
    }
  });

  return (
    <div id="pdfjs_sidebar" dangerouslySetInnerHTML={{ __html: webPdfLib.getSideTemplate() }}></div>
  );
}

export default WebPDFSidebar;
