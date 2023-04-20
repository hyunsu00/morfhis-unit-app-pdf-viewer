import webPdfLib from '../webPdfLib.js';
import AnnotationManager from '../annotation/annotationManager.js';

/**  
 * View 액션 클래스.
*/
export default class AView {
  /**
   * ACTION_ID.ZOOM 액션시 호출되는 함수
   * @param {ZOOM_VALUE | number} zoomValue - 줌설정값(number는 0~3사이 실수)
   */
  static zoom(zoomValue) {
    console.group(`function zoom(zoomValue)`);

    console.log(`current scaleValue = ${AnnotationManager.currentScaleValue}`);
    AnnotationManager.currentScaleValue = zoomValue;
    console.log(`changed scaleValue = ${AnnotationManager.currentScaleValue}`);

    console.groupEnd();
  }

  /**
   * ACTION_ID.THUMBNAIL_VIEW 액션시 호출되는 함수
   * @param {Boolean} flag - 보이기/숨기기(optional)
   */
  static thumnailView(flag) {
    console.group(`function thumnailView(flag)`);

    if (flag === undefined) {
      flag = !webPdfLib.PDFViewerApplication.pdfSidebar.isOpen;
    } else {
      if (flag == webPdfLib.PDFViewerApplication.pdfSidebar.isOpen) {
        return;
      }
    }

    if (flag) {
      webPdfLib.PDFViewerApplication.pdfSidebar.open();
    } else {
      webPdfLib.PDFViewerApplication.pdfSidebar.close();
    }

    console.groupEnd();
  }
}
