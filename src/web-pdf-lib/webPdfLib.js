// webPdfLib.js
import PDFJsListener from './listener/pdfjsListener.js';
import AnnotationManager from './annotation/annotationManager.js';
import UndoRedoManager from './undoRedo/UndoRedoManager.js';
//
import './webPdfLib.scss';
import mainHtml from './template/webPdfLib.html';
import sideHtml from './template/webPdfSidebar.html';
import ACTION_ID from './define/actionDefines.js';
import EVENT_ID from './define/eventDefines.js';
import { 
  ZOOM_VALUE, 
  FIND_TYPE, 
  DRAW_TYPE, 
  CURSOR_TYPE, 
  LINE_STYLE, 
  COLOR_TYPE 
} from './define/valueDefines.js';
import ActionManager from './action/actionManager.js';
import EventManager from './event/eventManager.js';
import ValueGenerator from './action/valueGenerator.js';

export { 
  ACTION_ID, 
  EVENT_ID, 
  ZOOM_VALUE, 
  FIND_TYPE, 
  DRAW_TYPE, 
  CURSOR_TYPE, 
  LINE_STYLE, 
  COLOR_TYPE 
};

/**
 * @category Main
 * @class webPdfLib
 */
export default (function () {
  return {
    /**
     * 초기화
     * @memberof webPdfLib
     * @param {String} lipsPath - libs 경로
     * @example <caption>초기화</caption>
     * webPdfLib.initialize(`${process.env.PUBLIC_URL}/libs`);
     */
    initialize(lipsPath) {
      console.log(`[webPdfLib.initialize(${lipsPath})]`);
      // libPath = `${process.env.PUBLIC_URL}/libs`;
      import(/* webpackIgnore: true */ `${lipsPath}/pdfjs/web/viewer.js`)
        .then((module) => {
          const _appOptions = window.PDFViewerApplicationOptions;
          _appOptions.set('disablePreferences', true);
          _appOptions.set('scrollModeOnLoad', 0);
          _appOptions.set('defaultUrl', `${lipsPath}/pdfjs/web/compressed.tracemonkey-pldi-09.pdf`); // 절대경로
          _appOptions.set('workerSrc', `${lipsPath}/pdfjs/build/pdf.worker.js`); // 절대경로
          _appOptions.set('sandboxBundleSrc', `${lipsPath}/pdfjs/build/pdf.sandbox.js`); // 절대경로
          _appOptions.set('documentloaded', PDFJsListener.onDocumentLoaded);
          _appOptions.set('documentSave', PDFJsListener.onDocumentSave);
          _appOptions.set('pdf-annotate-render', PDFJsListener.onWebViewerAnnotateRender);
          _appOptions.set('pdf-annotate-thumnailRender', PDFJsListener.onWebViewerAnnotateThumnailRender);
          _appOptions.set('updateUi', PDFJsListener.onUpdateUi);
          _appOptions.set('makeUpdateEventAction', PDFJsListener.onMakeUpdateEventAction);
          _appOptions.set('sidebarButtonStatus', PDFJsListener.onSidebarButtonStatus);
          _appOptions.set('setEnable', PDFJsListener.onSetEnable);
          _appOptions.set('updateDescription', PDFJsListener.onUpdateDescription);
          _appOptions.set('setUIDisableState', PDFJsListener.onSetUIDisableState);
          _appOptions.set('webViewerUpdateViewarea', PDFJsListener.onWebViewerUpdateViewarea);
          _appOptions.set('enablePermissions', true);
          _appOptions.set('initPasswordDialog', PDFJsListener.onInitPasswordDialog);
          _appOptions.set('closeDialog', PDFJsListener.onCloseDialog);
          _appOptions.set('showDialog', PDFJsListener.onShowDialog);
          _appOptions.set('showAlertModalDialog', PDFJsListener.onShowAlertModalDialog);
          _appOptions.set('hideLoadingProgress', PDFJsListener.onHideLoadingProgress);
          _appOptions.set('showLoadingProgress', PDFJsListener.onShowLoadingProgress);
          _appOptions.set('onParsedAnnotations', PDFJsListener.onParsedAnnotations);

          console.log(`[import(/* webpackIgnore: true */ ${lipsPath}/pdfjs/web/viewer.js) Succeeded`);

          import(/* webpackIgnore: true */ `${lipsPath}/pdf-annotate.js`)
            .then((module) => {
              this.PDFViewerApplication = window.PDFViewerApplication;
              this.PDFAppOptions = window.PDFViewerApplicationOptions;
              this.PDFAnnotateRender = window.PDFAnnotate['default'];
              this.gUndoRedoManager = new UndoRedoManager(window.PDFViewerApplication.baseUrl);

              AnnotationManager.initialize(this.PDFAnnotateRender);

              console.log(`[import(/* webpackIgnore: true */ ${lipsPath}/pdf-annotate.js) Succeeded`);
            })
            .catch((err) => {
              console.log(`[import(/* webpackIgnore: true */ ${lipsPath}/pdf-annotate.js) Failed] : ${err.message}`);
            });

          import(/* webpackIgnore: true */ `${lipsPath}/annotpdf.js`)
            .then((module) => {
              this.PDFAnnotateWriter = window.pdfAnnotate;

              console.log(`[import(/* webpackIgnore: true */ ${lipsPath}/annotpdf.js) Succeeded`);
            })
            .catch((err) => {
              console.log(`[import(/* webpackIgnore: true */ ${lipsPath}/annotpdf.js) Failed] : ${err.message}`);
            });

          import(/* webpackIgnore: true */ `${lipsPath}/pdf-lib.js`)
            .then((module) => {
              this.PDFLib = window.PDFLib;

              console.log(`[import(/* webpackIgnore: true */ ${lipsPath}/pdf-lib.js) Succeeded`);
            })
            .catch((err) => {
              console.log(`[import(/* webpackIgnore: true */ ${lipsPath}/pdf-lib.js) Failed] : ${err.message}`);
            });
        })
        .catch((err) => {
          console.log(`[import(/* webpackIgnore: true */ ${lipsPath}/pdfjs/web/viewer.js) Failed] : ${err.message}`);
        });
    },
    /**
     * MainTemplate HTML 탬플릿 반환
     * @memberof webPdfLib
     *
     * @return {String}
     */
    getMainTemplate() {
      return mainHtml;
    },
    /**
     * SideTemplate HTML 탬플릿 반환
     * @memberof webPdfLib
     *
     * @return {String}
     */
    getSideTemplate() {
      return sideHtml;
    },
    /**
     * ActionManager 함수객체 반환
     * @memberof webPdfLib
     *
     * @return {ActionManager}
     * @example <caption>기본 사용법</caption>
     * // 파일 오픈
     * webPdfLib.getActionManager().Execute(ACTION_ID.OPEN_FILE);
     * // 줌 설정 (폭맞춤)
     * webPdfLib.getActionManager().Execute(ACTION_ID.ZOOM, ZOOM_VALUE.PAGE_WIDHT);
     * // 줌 설정 (200%)
     * webPdfLib.getActionManager().Execute(ACTION_ID.ZOOM, 2.0);
     */
    getActionManager() {
      return ActionManager;
    },
    /**
     * ValueGenerator 함수객체 반환
     * @memberof webPdfLib
     *
     * @return {ValueGenerator}
     * @example <caption>기본 사용법</caption>
     * // [찾기]
     * const value = webPdfLib.getValueGenerator().createFindValue(FIND_TYPE.FIND_AGAIN, "Trace", false, false, true, false);
     * webPdfLib.getActionManager().Execute(ACTION_ID.FIND_OPEN, value);
     * // [속성변경]
     * // 채우기 속성 변경 (단색)
     * webPdfLib.getActionManager().Execute(ACTION_ID.CHANGE_PROPERTY, webPdfLib.getValueGenerator().createFillColorValue(target, COLOR_TYPE.solid, '#FF0000'));
     * // 채우기 속성 변경 (없음)
     * webPdfLib.getActionManager().Execute(ACTION_ID.CHANGE_PROPERTY, webPdfLib.getValueGenerator().createFillColorValue(target, COLOR_TYPE.noFill));
     * // 투명도 속성 변경
     * webPdfLib.getActionManager().Execute(ACTION_ID.CHANGE_PROPERTY, webPdfLib.getValueGenerator().createFillOpacityrValue(target, 50));
     */
    getValueGenerator() {
      return ValueGenerator;
    },
    /**
     * EventManager 함수객체 반환
     * @memberof webPdfLib
     *
     * @return {EventManager}
     * @example <caption>기본 사용법</caption>
     * // [문서가 메모리에 모두 로드되었을 경우 이벤트 등록]
     * // 콜백함수 생성
     * const onDocumentLoaded = function() {
     *  // 필요한 작업 처리
     * };
     * // 콜백함수 등록
     * webPdfLib.getEventManager().on(EVENT_ID.DOCUMENT_LOADED, onDocumentLoaded);
     * // 콜백함수 해제
     * webPdfLib.getEventManager().off(EVENT_ID.DOCUMENT_LOADED, onDocumentLoaded);
     */
    getEventManager() {
      return EventManager;
    },
    /**
     * target 개체의 속성 반환
     * @memberof webPdfLib
     * @param {Object} target - 주석 개체
     *
     * @return {Object}
     */
    getAnnotationProperties(target) {
      return AnnotationManager.getAnnotationProperties(target);
    },
    /**
     * 현재 활성화된 페이지 번호 반환
     * @memberof webPdfLib
     *
     * @return {number}
     */
    getCurrentPageNumber() {
      return AnnotationManager.currentPageNumber;
    },
    /**
     * 문서의 전체 페이지수 반환
     * @memberof webPdfLib
     *
     * @return {number}
     */
    getTotalPageNumber() {
      return AnnotationManager.totalPage;
    },
    /**
     * 문서 타이틀 반환
     * @memberof webPdfLib
     *
     * @return {String}
     */
    getTitle() {
      return AnnotationManager.documentTitle;
    },
     /**
     * 되돌리기 갯수 반환
     * @memberof webPdfLib
     *
     * @return {number}
     */
    getUndoCount() {
      return this.gUndoRedoManager.GetUndoCount();
    },
    /**
     * 다시 실행 갯수 반환
     * @memberof webPdfLib
     *
     * @return {number}
     */
    getRedoCount() {
      return this.gUndoRedoManager.GetRedoCount();
    }
  };
})();
