import webPdfLib from '../webPdfLib.js';

/**  
 * Slideshow 액션 클래스.
*/
export default class ASlideshow {
  static slideshow_first(value) {
    console.group(`function slideshow_first(evtAction)`);

    webPdfLib.PDFViewerApplication.secondaryToolbar.eventBus.dispatch('firstpage', {
      source: webPdfLib.PDFViewerApplication.secondaryToolbar,
    });
    webPdfLib.PDFViewerApplication.secondaryToolbar.close();

    ASlideshow.slideshow_current(value);

    console.groupEnd();
  }

  static slideshow_current() {
    console.group(`function slideshow_current(evtAction)`);

    webPdfLib.PDFViewerApplication.toolbar.eventBus.dispatch('presentationmode', {
      source: webPdfLib.PDFViewerApplication.toolbar,
    });

    console.groupEnd();
  }
}
