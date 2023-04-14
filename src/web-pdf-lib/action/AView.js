import webPdfLib from '../webPdfLib.js';
import AnnotationManager from '../annotation/annotationManager.js';

export default class AView {
  /**
   *
   * @param {*} value
   * page-actual : 실제 사이즈
   * page-height 쪽맞춤
   * page-width 폭맞춤
   * 0.1 ~ 3.0 비율
   */
  static zoom(value) {
    console.group(`function zoom(evtAction)`);

    console.log(`current scaleValue = ${AnnotationManager.currentScaleValue}`);
    AnnotationManager.currentScaleValue = value;
    console.log(`changed scaleValue = ${AnnotationManager.currentScaleValue}`);

    console.groupEnd();
  }
  static thumnailView(_evtAction) {
    console.group(`function thumnailView(evtAction)`);

    if (webPdfLib.PDFViewerApplication.pdfSidebar.isOpen) {
      webPdfLib.PDFViewerApplication.pdfSidebar.close();
    } else {
      webPdfLib.PDFViewerApplication.pdfSidebar.open();
    }

    console.groupEnd();
  }
}
