import React, { useEffect, useRef } from "react";
import "../../../web-pdf-lib/webPdfLib.scss";
import webPdfLib from '../../../web-pdf-lib/webPdfLib';
import html from "../../../web-pdf-lib/webPdfLib.html";

function WebPDF() {
  console.log("function WebPDF())");

  // componentDidMount with useEffect
  useEffect(() => {
    console.log("WebPDF.componentDidMount[Function]");

    // import_pdfjs();
    webPdfLib.initialize(`${process.env.PUBLIC_URL}/libs`);
    
    // componentWillUnmount with useEffect
    return () => {
      console.log("WebPDF.componentWillUnmount[Function]");
    };
  }, []);

  // componentDidUpdate with useEffect
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      console.log("WebPDF.componentDidUpdate[Function]");
    }
  });

  return (
    <div id="pdfjs_content" dangerouslySetInnerHTML={{ __html: html }}></div>
  );
}

export default WebPDF;
