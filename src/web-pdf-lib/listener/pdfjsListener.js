// pdfjsListener.js
/*
import Util from '../../utils/util.js';
*/
import AnnotationManager from '../annotation/annotationManager.js';
import webPdfLib from '../webPdfLib.js';
import EVENT_ID from "../define/eventDefines.js";
import EventManager from '../event/eventManager.js';
import UiManager from '../uiFrame/uiManager.js';

export default (function () {
  return {
    async onDocumentLoaded() {
/*      
      UiManager.setEnableAnnotate(!Util.isViewMode());
      UiManager.setEnablePrint(true);
*/
      AnnotationManager.modified = false;
/*
      if (Util.IsMavenMode()) {
        webPdfLib.PDFViewerApplication.pdfViewer.mavenModeState = true;
      }
*/
      // 문서가 열릴경우 로컬스토리지 삭제
      window.localStorage.removeItem(`${webPdfLib.PDFViewerApplication.baseUrl}/annotations`);

      // low data를 얻어온다.
      let data = await webPdfLib.PDFViewerApplication.pdfDocument.getData();
      try {
        data = await AnnotationManager.removeAnnotations(data);
      } catch (e) {
        console.log('Error when removeAnnotations : ' + e);
      }
      AnnotationManager.documentData = data;

      EventManager.dispatch(EVENT_ID.DOCUMENT_LOADED, {});
    },
    onWebViewerAnnotateRender({ parentNode, canvasWrapper, id, pdfPage, scale }) {
      const docId = webPdfLib.PDFViewerApplication.baseUrl;
      AnnotationManager.render(docId, parentNode, canvasWrapper, id, pdfPage, scale);
    },
    onWebViewerAnnotateThumnailRender({ pageNumber }) {
      AnnotationManager.renderThumnail(pageNumber);
    },
    onParsedAnnotations(annotations, pageIndex) {
      console.log('Begin pdfjsListener.onParsedAnnotations(annotations)');
      AnnotationManager.parsedAnnotations(annotations, pageIndex);
      console.log('End pdfjsListener.onParsedAnnotations(annotations)');
    },

    onDocumentSave() {
      const docId = webPdfLib.PDFViewerApplication.baseUrl;
      AnnotationManager.save(docId, webPdfLib.PDFViewerApplication.pdfDocument, false);
    },

    // 다이얼로그
    onInitPasswordDialog() {
/*      
      let uiUpdateAction = EventActionGenerator.makeUpdateEventAction('e_dialog_password', { file_password: '' });
      EventActionGenerator.addFocusProperty(uiUpdateAction, 'file_password');
      $.publish('/ui/update', uiUpdateAction);
*/
      EventManager.dispatch(EVENT_ID.PASSWORD, { state: 'failed' });
    },

    // 1. 문서오픈시 패스워드 문서를 열경우 호출됨 ==> 다이얼로드 호출
    onShowDialog({ eventType, widgetName, value, dialogName, updateValues, focusName }) {
/*
      let pubAction = EventActionGenerator.makeEventActionObj('update', eventType, widgetName, value);
      pubAction = EventActionGenerator.addEventAction(pubAction, EventActionGenerator.makeUpdateEventAction(dialogName, updateValues));
      pubAction = EventActionGenerator.addFocusProperty(pubAction, focusName);
      $.publish('/ui/update', pubAction);
*/
      //
      switch (value) {
        case 'dialog_password': // 패스워드 다이얼로그
          EventManager.dispatch(EVENT_ID.PASSWORD, { state: 'open' });
          break;
        case 'dialog_find_replace': // 찾기 다이얼로그
          break;
      }
    },

    onShowAlertModalDialog({ eventType, widgetName, dialogName, value }) {
/*     
      let pubAction = EventActionGenerator.makeEventActionObj('update', eventType, widgetName, dialogName);

      UiController.setValuesToMsgDialog(dialogName, value.cmd, value.title, value.message, false);

      pubAction = EventActionGenerator.addEventAction(EventActionGenerator.makeEventActionObj('update', UiDefine.EVENT_ACTION_TYPE.HIDDEN, UiDefine.EVENT_ACTION_NAMES.E_DIALOG_ALERT, { execute: 'confirm' }), pubAction);

      $.publish('/ui/update', pubAction);
 */
    },

    // 1. 문서오픈시 패스워드 문서를 성공적으로 오픈시 호출됨
    onCloseDialog() {
/*      
      UiController.closeDialog();
*/
      EventManager.dispatch(EVENT_ID.PASSWORD, { state: 'succeeded' });
    },

    onUpdateUi({ eventType, widgetName, value }) {
/*     
      UiController.updateUi(EventActionGenerator.makeEventActionObj('update', eventType, widgetName, value));
*/
      switch (widgetName) {
        case 'description':
          {
            EventManager.dispatch(EVENT_ID.DOCUMENT_SUMMARY, { value });
            webPdfLib.PDFViewerApplication.pdfDocumentProperties.close();
          }
          break;
        case 'page_number':
        default:
          EventManager.dispatch(EVENT_ID.UPDATE_UI, { name: widgetName, value });
          break;
      }
    },

    onMakeUpdateEventAction({ widgetName, value }) {
/*     
      // 손도구 / 선택 선택시 주석 입력 활성/비활성화 처리
      if (!Util.isViewMode() && (widgetName == 't_hand' || widgetName == 't_select') && value == 'on') {
        UiManager.setEnableAnnotate(widgetName === 't_hand' ? false : true);
      }

      let pubAction = EventActionGenerator.makeUpdateEventAction(widgetName, value);
      $.publish('/ui/update', pubAction);
 */
    },
    onSidebarButtonStatus({ widgetName, value }) {
/*      
      UiController.setSidebarButtonOn(widgetName, value);
*/
    },
    onSetEnable({ widgetName, value }) {
/*      
      UiController.setEnable(widgetName, value);
*/
    },
    onUpdateDescription({ value }) {
/*     
      UiController._updateDescription(value);
*/
    },
    onSetUIDisableState({ value }) {
/*      
      UiManager.onSetStyleBarDisableState(value);
      UiManager.onSetAnnotationSidebarEnable(value);
      UiManager.setPopupEditing(true);
*/
    },
    onWebViewerUpdateViewarea() {
/*      
      UiController.hideQuickMenu();
      UiController.hideTool(UiDefine.TOOL_ANNOTATION_MENU);
*/
    },
    onHideLoadingProgress() {  
      UiManager.hideLoadingProgress();
    },
    onShowLoadingProgress() { 
      UiManager.showLoadingProgress();
    },
  };
})();
