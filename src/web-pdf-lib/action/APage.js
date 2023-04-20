import webPdfLib from '../webPdfLib.js';

/**  
 * Page 액션 클래스.
*/
export default class APage {
  static e_first_page() {
    webPdfLib.PDFViewerApplication.secondaryToolbar.eventBus.dispatch('firstpage', {
      source: webPdfLib.PDFViewerApplication.toolbar,
    });
  }

  static e_previous_page() {
    webPdfLib.PDFViewerApplication.secondaryToolbar.eventBus.dispatch('previouspage', {
      source: webPdfLib.PDFViewerApplication.toolbar,
    });
  }

  static e_next_page() {
    webPdfLib.PDFViewerApplication.secondaryToolbar.eventBus.dispatch('nextpage', {
      source: webPdfLib.PDFViewerApplication.toolbar,
    });
  }

  static e_last_page() {
    webPdfLib.PDFViewerApplication.secondaryToolbar.eventBus.dispatch('lastpage', {
      source: webPdfLib.PDFViewerApplication.toolbar,
    });
  }

  static page_number(value) {
    if (value <= webPdfLib.PDFViewerApplication.pdfLinkService.pagesCount) {
      webPdfLib.PDFViewerApplication.toolbar.eventBus.dispatch('pagenumberchanged', {
        source: webPdfLib.PDFViewerApplication.toolbar,
        value: value,
      });
    }
  }
}
