import webPdfLib from '../webPdfLib.js';
import AnnotationManager from '../annotation/annotationManager.js';
import { CURSOR_TYPE } from "../define/valueDefines.js";

export default class ATool {
  static switchcursortool(cursorType) {
    const details = {
      source: webPdfLib.PDFViewerApplication.secondaryToolbar,
      tool: cursorType === CURSOR_TYPE.SELECT ? 0 : 1,
    };
    webPdfLib.PDFViewerApplication.secondaryToolbar.eventBus.dispatch('switchcursortool', details);
    webPdfLib.PDFViewerApplication.secondaryToolbar.close();
    // 손도구가 클릭되어 있을 경우 주석관련 액션 비활성화
    AnnotationManager.switchUI(cursorType === CURSOR_TYPE.HAND ? 'none' : 'cursor');
  }
}
