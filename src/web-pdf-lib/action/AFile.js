import webPdfLib from '../webPdfLib.js';
import AnnotationManager from '../annotation/annotationManager.js';

export default class AFile {
  static async save(_evtAction) {
    console.group(`function save(_evtAction)`);
    await AnnotationManager.save(webPdfLib.PDFViewerApplication.baseUrl, webPdfLib.PDFViewerApplication.pdfDocument, false);
    console.groupEnd();
  }

  static async download(_evtAction) {
    console.group(`function download(_evtAction)`);
    await AnnotationManager.download(webPdfLib.PDFViewerApplication.baseUrl, webPdfLib.PDFViewerApplication.pdfDocument);
    console.groupEnd();
  }

  static d_open(_evtAction) {
    console.group(`function d_open(_evtAction)`);
    webPdfLib.PDFViewerApplication.toolbar.eventBus.dispatch('openfile', {
      source: webPdfLib.PDFViewerApplication.toolbar,
    });
    console.groupEnd();
  }

  static d_print(_evtAction) {
    console.group(`function d_print(_evtAction)`);
    AnnotationManager.print(webPdfLib.PDFViewerApplication.baseUrl, webPdfLib.PDFViewerApplication.pdfDocument);
    console.groupEnd();
  }

  static d_info(_evtAction) {
    console.group(`function d_info(_evtAction)`);
    webPdfLib.PDFViewerApplication.secondaryToolbar.eventBus.dispatch('documentproperties', {
      source: webPdfLib.PDFViewerApplication.secondaryToolbar,
    });
    console.warn(`function d_info(_evtAction) 다이얼로그 구현 필요`);
    console.groupEnd();
  }
}
