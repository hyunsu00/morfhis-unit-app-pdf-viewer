import webPdfLib from '../webPdfLib.js';
import AnnotationManager from '../annotation/annotationManager.js';
import UiManager from '../uiFrame/uiManager.js';

export default class AEdit {
  static e_undo(_evtAction) {
    webPdfLib.gUndoRedoManager.Undo();
  }

  static e_redo(_evtAction) {
    webPdfLib.gUndoRedoManager.Redo();
  }

  static e_copy(value) {
    document.execCommand('copy'); //복사
  }

  static e_select_all(value) {
    console.group(`function e_select_all(value)`);
    console.warn(`모두 선택 전에 툴바 밑줄, 취소선, 형광펜이 선택되어 있으면 해제해준다.`);

    UiManager.setSelectionAll();
    AnnotationManager.switchUI('none');

    console.groupEnd();
  }

  static d_find(value) {
    console.group(`function d_find(value)`);
    webPdfLib.PDFViewerApplication.findBar.eventBus.dispatch('find', value);
    console.warn(`function d_find(_evtAction) 다이얼로그 구현 필요`);
    console.groupEnd();
  }

  static d_find_close(_value) {
    webPdfLib.PDFViewerApplication.findBar.eventBus.dispatch('findbarclose', {
      source: webPdfLib.PDFViewerApplication.findBar,
    });
  }
}
