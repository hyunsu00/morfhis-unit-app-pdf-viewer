import webPdfLib from '../webPdfLib.js';
import AnnotationManager from '../annotation/annotationManager.js';
import EVENT_ID from "../define/eventDefines.js";
import EventManager from '../event/eventManager.js';

/**  
 * File 액션 클래스.
*/
export default class AFile {
  static async save() {
    console.group(`function save()`);
    await AnnotationManager.save(webPdfLib.PDFViewerApplication.baseUrl, webPdfLib.PDFViewerApplication.pdfDocument, false);
    console.groupEnd();
  }

  static async download() {
    console.group(`function download()`);
    await AnnotationManager.download(webPdfLib.PDFViewerApplication.baseUrl, webPdfLib.PDFViewerApplication.pdfDocument);
    console.groupEnd();
  }

  static d_open() {
    console.group(`function d_open()`);
    webPdfLib.PDFViewerApplication.toolbar.eventBus.dispatch('openfile', {
      source: webPdfLib.PDFViewerApplication.toolbar,
    });
    console.groupEnd();
  }

  static d_print() {
    console.group(`function d_print()`);
    AnnotationManager.print(webPdfLib.PDFViewerApplication.baseUrl, webPdfLib.PDFViewerApplication.pdfDocument);
    console.groupEnd();
  }

  static e_dialog_password(password) {
    if (password) {
      webPdfLib.PDFViewerApplication.passwordPrompt.verify(password);
    } else {
      EventManager.dispatch(EVENT_ID.onPassword, { state: 'failed' });
    }
  }

  static d_info() {
    console.group(`function d_info()`);
    webPdfLib.PDFViewerApplication.secondaryToolbar.eventBus.dispatch('documentproperties', {
      source: webPdfLib.PDFViewerApplication.secondaryToolbar,
    });
    console.warn(`function d_info() 다이얼로그 구현 필요`);
    console.groupEnd();
  }
}
