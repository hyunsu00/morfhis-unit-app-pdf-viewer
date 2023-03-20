import React, { useEffect, useRef } from "react";
import "../../../web-pdf-lib/webPdfLib.scss";
import webPdfLib from '../../../web-pdf-lib/webPdfLib';
import html from "../../../web-pdf-lib/webPdfLib.html";
import EventManager from "../../../web-pdf-lib/event/eventManager";
import ActionManager from '../../../web-pdf-lib/action/actionManager';

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

  useEffect(() => {
    const onError = function(event) {
      const {name, value} = event.detail;
    };
    EventManager.on(EventManager.onError, onError);
    return () => {
      EventManager.off(EventManager.onError, onError);
    }
  }, []);

  function onMouseUp(e) {
    ActionManager.execute({name:'e_select_all'});
  }

  return (
    <div id="pdfjs_content" dangerouslySetInnerHTML={{ __html: html }} onMouseUp={onMouseUp}></div>
  );
}

export default WebPDF;
