import React, { useEffect, useRef } from "react";
import "../../../web-pdf-lib/webPdfLib.scss";
import webPdfLib from '../../../web-pdf-lib/webPdfLib';
import html from "../../../web-pdf-lib/webPdfLib.html";
import EventManager from "../../../web-pdf-lib/event/eventManager";
import ActionManager from '../../../web-pdf-lib/action/actionManager';
import UiManager from '../../../web-pdf-lib/uiFrame/uiManager';
import actionManager from '../../../web-pdf-lib/action/actionManager';

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
      const {errType} = event.detail;
      switch (errType) 
      {
      case 'ERR_ALL_SELECTED':
        {
          UiManager.clearSelection();
          console.warn(`주석은 최대 한 페이지까지만 적용 가능합니다.`);
        }
        break;
      default:
        break;
      }
    };
    const onQuickMenu = function(event) {
      const {posInfo, range} = event.detail;
      // actionManager.execute({name:'a_quick_underline', range:range});
      // actionManager.execute({name:'a_quick_strikeout', range:range});
      // actionManager.execute({name:'a_quick_highlight', range:range});
    }

    const onAnnotationSelected = function(event) {
      const {target, rects} = event.detail;
      // 주석 선택시 
      // 1. 주석 속성창 활성화
      // 2. Quick 메뉴가 보인다면 숨기기
      // 3. 주석 메뉴 보이기
    }
    const onAnnotationUnSelected = function(event) {
      const {target} = event.detail;
      // 주석 선택 해제시 
      // 1. 주석 속성창 비활성화
      // 2. 주석 메뉴 숨기기
    }

    
    EventManager.on(EventManager.onError, onError);
    EventManager.on(EventManager.onQuickMenu, onQuickMenu);
    EventManager.on(EventManager.onAnnotationSelected, onAnnotationSelected);
    EventManager.on(EventManager.onAnnotationUnSelected, onAnnotationUnSelected);
    
    return () => {
      EventManager.off(EventManager.onError, onError);
      EventManager.off(EventManager.onQuickMenu, onQuickMenu);
      EventManager.off(EventManager.onAnnotationSelected, onAnnotationSelected);
      EventManager.off(EventManager.onAnnotationUnSelected, onAnnotationUnSelected);
    }
  }, []);

  return (
    <div id="pdfjs_content" dangerouslySetInnerHTML={{ __html: html }}></div>
  );
}

export default WebPDF;
