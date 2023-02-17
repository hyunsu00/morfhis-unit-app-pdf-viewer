import React, { useEffect, useRef } from "react";
import "./pdfjs/pdfjs.css"
import import_pdfjs from './pdfjs/pdfjs';
import html from "./pdfjs/pdfjs.html";
import { ShadowDomUtil } from '../../ShadowDomUtil';

function WebPDF() {
  console.log("function WebPDF())");

  // componentDidMount with useEffect
  useEffect(() => {
    console.log("WebPDF.componentDidMount[Function]");

    import_pdfjs();
    
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
    <div id="pdfjs_wrap" dangerouslySetInnerHTML={{ __html: html }}></div>
  );
}

export default WebPDF;
