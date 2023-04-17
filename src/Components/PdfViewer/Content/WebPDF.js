import React, { useEffect, useRef } from 'react';
import '../../../web-pdf-lib/webPdfLib.scss';
import webPdfLib from '../../../web-pdf-lib/webPdfLib';
import html from '../../../web-pdf-lib/webPdfLib.html';
import EventManager from '../../../web-pdf-lib/event/eventManager';
import ActionManager, {AID} from '../../../web-pdf-lib/action/actionManager';
import AnnotationManager from '../../../web-pdf-lib/annotation/annotationManager';
import UiManager from '../../../web-pdf-lib/uiFrame/uiManager';
import ValueGenerator, {COLOR_TYPE} from '../../../web-pdf-lib/action/valueGenerator';

function WebPDF() {
  console.log('function WebPDF())');

  // componentDidMount with useEffect
  useEffect(() => {
    console.log('WebPDF.componentDidMount[Function]');

    // import_pdfjs();
    webPdfLib.initialize(`${process.env.PUBLIC_URL}/libs`);

    // componentWillUnmount with useEffect
    return () => {
      console.log('WebPDF.componentWillUnmount[Function]');
    };
  }, []);

  // componentDidUpdate with useEffect
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      console.log('WebPDF.componentDidUpdate[Function]');
    }
  });

  useEffect(() => {
    const onError = function (event) {
      const { errType } = event.detail;
      switch (errType) {
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
    const onPassword = function (event) {
      const { state } = event.detail;
      switch (state) {
        case 'open':
          {
            console.warn(`패스워드 다이얼로그 입력 상자를 호출한다.`);
            // const password = "";
            // ActionManager.Execute(AID.PASSWORD, password);
          }
          break;
        case 'succeeded':
          console.warn(`성공시 패스워드 다이얼로그를 종료한다.`);
          break;
        case 'failed':
          {
            console.warn(`실패시 패스워드 다이얼로그 입력 상자를 초기화 해준다.`);
            // const password = "123455";
            // ActionManager.Execute(AID.PASSWORD, password);
          }
          break;
        default:
          break;
      }
    };
    const onDocumentSummary = function (event) {
      const { value } = event.detail;
      console.warn('onDocumentSummary value = ', JSON.stringify(value));
    };
    const onQuickMenu = function (event) {
      const { posInfo, range } = event.detail;
      // ActionManager.Execute(AID.QUICK_UNDERLINE, range);
      // ActionManager.Execute(AID.QUICK_STRIKEOUT, range);
      // ActionManager.Execute(AID.QUICK_HIGHLIGHT, range);
    };

    const onAnnotationSelected = function (event) {
      const { target, rects } = event.detail;
      // 주석 선택시
      // 1. 주석 속성창 활성화
      let properties = AnnotationManager.getAnnotationProperties(target);
      console.log('onAnnotationSelected target.properties = ', JSON.stringify(properties));
      // 2. Quick 메뉴가 보인다면 숨기기
      // 3. 주석 메뉴 보이기
      // ActionManager.Execute(AID.CHANGE_PROPERTY, ValueGenerator.createFillColorValue(target, COLOR_TYPE.solid, '#FF0000'));
      // ActionManager.Execute(AID.CHANGE_PROPERTY, ValueGenerator.createFillOpacityrValue(target, 50));
      // ActionManager.Execute(AID.CHANGE_PROPERTY, ValueGenerator.createFillColorValue(target, COLOR_TYPE.noFill));
    };
    const onAnnotationUnSelected = function (event) {
      const { target } = event.detail;
      // 주석 선택 해제시
      // 1. 주석 속성창 비활성화
      // 2. 주석 메뉴 숨기기
    };

    EventManager.on(EventManager.onError, onError);
    EventManager.on(EventManager.onPassword, onPassword);
    EventManager.on(EventManager.onDocumentSummary, onDocumentSummary);
    EventManager.on(EventManager.onQuickMenu, onQuickMenu);
    EventManager.on(EventManager.onAnnotationSelected, onAnnotationSelected);
    EventManager.on(EventManager.onAnnotationUnSelected, onAnnotationUnSelected);

    return () => {
      EventManager.off(EventManager.onError, onError);
      EventManager.off(EventManager.onPassword, onPassword);
      EventManager.off(EventManager.onDocumentSummary, onDocumentSummary);
      EventManager.off(EventManager.onQuickMenu, onQuickMenu);
      EventManager.off(EventManager.onAnnotationSelected, onAnnotationSelected);
      EventManager.off(EventManager.onAnnotationUnSelected, onAnnotationUnSelected);
    };
  }, []);

  return <div id='pdfjs_content' dangerouslySetInnerHTML={{ __html: html }}></div>;
}

export default WebPDF;
