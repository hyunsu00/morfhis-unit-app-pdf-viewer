import React, { useEffect, useRef } from 'react';

import webPdfLib, {AID, EID, COLOR_TYPE} from '../../../web-pdf-lib/webPdfLib';

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
            console.warn(`주석은 최대 한 페이지까지만 적용 가능합니다.`);
            webPdfLib.getActionManager().Execute(AID.SELECT_CLEAR);
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
            // webPdfLib.getActionManager().Execute(AID.PASSWORD, password);
          }
          break;
        case 'succeeded':
          console.warn(`성공시 패스워드 다이얼로그를 종료한다.`);
          break;
        case 'failed':
          {
            console.warn(`실패시 패스워드 다이얼로그 입력 상자를 초기화 해준다.`);
            // const password = "123455";
            // webPdfLib.getActionManager().Execute(AID.PASSWORD, password);
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
      // webPdfLib.getActionManager().Execute(AID.QUICK_UNDERLINE, range);
      // webPdfLib.getActionManager().Execute(AID.QUICK_STRIKEOUT, range);
      // webPdfLib.getActionManager().Execute(AID.QUICK_HIGHLIGHT, range);
    };

    const onAnnotationSelected = function (event) {
      const { target, rects } = event.detail;
      // 주석 선택시
      // 1. 주석 속성창 활성화
      let properties = webPdfLib.getAnnotationProperties(target);
      console.log('onAnnotationSelected target.properties = ', JSON.stringify(properties));
      // 2. Quick 메뉴가 보인다면 숨기기
      // 3. 주석 메뉴 보이기
      // webPdfLib.getActionManager().Execute(AID.CHANGE_PROPERTY, webPdfLib.getValueGenerator().createFillColorValue(target, COLOR_TYPE.solid, '#FF0000'));
      // webPdfLib.getActionManager().Execute(AID.CHANGE_PROPERTY, webPdfLib.getValueGenerator().createFillOpacityrValue(target, 50));
      // webPdfLib.getActionManager().Execute(AID.CHANGE_PROPERTY, webPdfLib.getValueGenerator().createFillColorValue(target, COLOR_TYPE.noFill));
    };
    const onAnnotationUnSelected = function (event) {
      const { target } = event.detail;
      // 주석 선택 해제시
      // 1. 주석 속성창 비활성화
      // 2. 주석 메뉴 숨기기
    };

    webPdfLib.getEventManager().on(EID.onError, onError);
    webPdfLib.getEventManager().on(EID.onPassword, onPassword);
    webPdfLib.getEventManager().on(EID.onDocumentSummary, onDocumentSummary);
    webPdfLib.getEventManager().on(EID.onQuickMenu, onQuickMenu);
    webPdfLib.getEventManager().on(EID.onAnnotationSelected, onAnnotationSelected);
    webPdfLib.getEventManager().on(EID.onAnnotationUnSelected, onAnnotationUnSelected);

    return () => {
      webPdfLib.getEventManager().off(EID.onError, onError);
      webPdfLib.getEventManager().off(EID.onPassword, onPassword);
      webPdfLib.getEventManager().off(EID.onDocumentSummary, onDocumentSummary);
      webPdfLib.getEventManager().off(EID.onQuickMenu, onQuickMenu);
      webPdfLib.getEventManager().off(EID.onAnnotationSelected, onAnnotationSelected);
      webPdfLib.getEventManager().off(EID.onAnnotationUnSelected, onAnnotationUnSelected);
    };
  }, []);

  return <div id='pdfjs_content' dangerouslySetInnerHTML={{ __html: webPdfLib.getMainTemplate() }}></div>;
}

export default WebPDF;
