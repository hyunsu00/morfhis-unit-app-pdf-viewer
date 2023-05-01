import React, { useEffect, useRef } from 'react';

import webPdfLib, {ACTION_ID, EVENT_ID, COLOR_TYPE} from '../../../web-pdf-lib/webPdfLib';

function WebPDF() {
  console.log('function WebPDF())');

  // componentDidMount with useEffect
  useEffect(() => {
    console.log('WebPDF.componentDidMount[Function]');

    // import_pdfjs();
    webPdfLib.initialize(`${process.env.PUBLIC_URL}/libs`, `${process.env.PUBLIC_URL}/libs/pdfjs/web/compressed.tracemonkey-pldi-09.pdf`);

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
            webPdfLib.getActionManager().Execute(ACTION_ID.SELECT_CLEAR);
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
            // webPdfLib.getActionManager().Execute(ACTION_ID.PASSWORD, password);
          }
          break;
        case 'succeeded':
          console.warn(`성공시 패스워드 다이얼로그를 종료한다.`);
          break;
        case 'failed':
          {
            console.warn(`실패시 패스워드 다이얼로그 입력 상자를 초기화 해준다.`);
            // const password = "123455";
            // webPdfLib.getActionManager().Execute(ACTION_ID.PASSWORD, password);
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
      // webPdfLib.getActionManager().Execute(ACTION_ID.QUICK_UNDERLINE, range);
      // webPdfLib.getActionManager().Execute(ACTION_ID.QUICK_STRIKEOUT, range);
      // webPdfLib.getActionManager().Execute(ACTION_ID.QUICK_HIGHLIGHT, range);
    };

    const onAnnotationSelected = function (event) {
      const { target, rects } = event.detail;
      // 주석 선택시
      // 1. 주석 속성창 활성화
      let properties = webPdfLib.getAnnotationProperties(target);
      console.log('onAnnotationSelected target.properties = ', JSON.stringify(properties));
      // 2. Quick 메뉴가 보인다면 숨기기
      // 3. 주석 메뉴 보이기
      // webPdfLib.getActionManager().Execute(ACTION_ID.CHANGE_PROPERTY, webPdfLib.getValueGenerator().createFillColorValue(target, COLOR_TYPE.solid, '#FF0000'));
      // webPdfLib.getActionManager().Execute(ACTION_ID.CHANGE_PROPERTY, webPdfLib.getValueGenerator().createFillOpacityrValue(target, 50));
      // webPdfLib.getActionManager().Execute(ACTION_ID.CHANGE_PROPERTY, webPdfLib.getValueGenerator().createFillColorValue(target, COLOR_TYPE.noFill));
    };
    const onAnnotationUnSelected = function (event) {
      const { target } = event.detail;
      // 주석 선택 해제시
      // 1. 주석 속성창 비활성화
      // 2. 주석 메뉴 숨기기
    };
    const onDocumentSave = function (event) {
      console.warn(`EVENT_ID.DOCUMENT_SAVE 구현 필요`);
      const { data } = event.detail;

      // const xhr = new XMLHttpRequest();
      // const formdata = new FormData();
      // formdata.enctype = 'multipart/form-data';
      // formdata.method = 'post';
      // formdata.append("open", _getEncodingOpen(_parameters.open));
      // formdata.append("docId", _documentId);
      // formdata.append("adapter", _parameters.adapter);
      // formdata.append("userSession", _parameters.smb_conn);
      // formdata.append("type", _requestName.save);
      // formdata.append("smb", _parameters.smb);
      // formdata.append("document_session_auth_token", _parameters.document_session_auth_token);
      // formdata.append("locale", _parameters.lang);
      // formdata.append("unlock", isUnload);
      // formdata.append("data", data);
      // xhr.open("Post", "handler/save", true);
      // xhr.onload = function (e) {
      //     UiManager.hideLoadingProgress();
      //     // if (xhr.status === 200) {
      //     //     successCb(e.target.response);
      //     // } else {
      //     //     errorCb(xhr);
      //     // }
      // };
      // xhr.send(formdata);

    };

    webPdfLib.getEventManager().on(EVENT_ID.ERROR, onError);
    webPdfLib.getEventManager().on(EVENT_ID.PASSWORD, onPassword);
    webPdfLib.getEventManager().on(EVENT_ID.DOCUMENT_SUMMARY, onDocumentSummary);
    webPdfLib.getEventManager().on(EVENT_ID.QUICK_MENU, onQuickMenu);
    webPdfLib.getEventManager().on(EVENT_ID.ANNOTATION_SELECTED, onAnnotationSelected);
    webPdfLib.getEventManager().on(EVENT_ID.ANNOTATION_UNSELECTED, onAnnotationUnSelected);
    webPdfLib.getEventManager().on(EVENT_ID.DOCUMENT_SAVE, onDocumentSave);
    return () => {
      webPdfLib.getEventManager().off(EVENT_ID.ERROR, onError);
      webPdfLib.getEventManager().off(EVENT_ID.PASSWORD, onPassword);
      webPdfLib.getEventManager().off(EVENT_ID.DOCUMENT_SUMMARY, onDocumentSummary);
      webPdfLib.getEventManager().off(EVENT_ID.QUICK_MENU, onQuickMenu);
      webPdfLib.getEventManager().off(EVENT_ID.ANNOTATION_SELECTED, onAnnotationSelected);
      webPdfLib.getEventManager().off(EVENT_ID.ANNOTATION_UNSELECTED, onAnnotationUnSelected);
      webPdfLib.getEventManager().off(EVENT_ID.DOCUMENT_SAVE, onDocumentSave);
    };
  }, []);

  return <div id='pdfjs_content' dangerouslySetInnerHTML={{ __html: webPdfLib.getMainTemplate() }}></div>;
}

export default WebPDF;
