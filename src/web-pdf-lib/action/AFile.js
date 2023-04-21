import webPdfLib from '../webPdfLib.js';
import AnnotationManager from '../annotation/annotationManager.js';
import EVENT_ID from '../define/eventDefines.js';
import EventManager from '../event/eventManager.js';

/**
 * @category Action
 * @class File 액션 클래스.
 */
export default class AFile {
  /**
   * ACTION_ID.SAVE 액션시 호출되는 함수
   */
  static async save() {
    console.group(`function save()`);
    await AnnotationManager.save(webPdfLib.PDFViewerApplication.baseUrl, webPdfLib.PDFViewerApplication.pdfDocument, false);
    console.groupEnd();
  }
  /**
   * ACTION_ID.DOWNLOAD 액션시 호출되는 함수
   */
  static async download() {
    console.group(`function download()`);
    await AnnotationManager.download(webPdfLib.PDFViewerApplication.baseUrl, webPdfLib.PDFViewerApplication.pdfDocument);
    console.groupEnd();
  }

  /**
   * ACTION_ID.OPEN_FILE 액션시 호출되는 함수
   * @param {String | Uint8Array | Object} file
   * @param {String}  file.originalUrl 파일명
   * @param {String}  file.url         로컬 파일 Url
   */
  static d_open(file) {
    console.group(`static d_open(file)`);

    // 로컬파일
    // file = {
    //   originalUrl: 'alphatrans-2019.pdf'
    //   url: 'blob:http://localhost:3000/2a2a7bd8-655f-47e9-9e62-d9b23c22944b'
    // }
    // URL
    // file = `http://127.0.0.1:5500/alphatrans.pdf`;
    // 데이터
    // let binaryStr = atob(
    //   'JVBERi0xLjcKCjEgMCBvYmogICUgZW50cnkgcG9pbnQKPDwKICAvVHlwZSAvQ2F0YWxvZwog' +
    //   'IC9QYWdlcyAyIDAgUgo+PgplbmRvYmoKCjIgMCBvYmoKPDwKICAvVHlwZSAvUGFnZXMKICAv' +
    //   'TWVkaWFCb3ggWyAwIDAgMjAwIDIwMCBdCiAgL0NvdW50IDEKICAvS2lkcyBbIDMgMCBSIF0K' +
    //   'Pj4KZW5kb2JqCgozIDAgb2JqCjw8CiAgL1R5cGUgL1BhZ2UKICAvUGFyZW50IDIgMCBSCiAg' +
    //   'L1Jlc291cmNlcyA8PAogICAgL0ZvbnQgPDwKICAgICAgL0YxIDQgMCBSIAogICAgPj4KICA+' +
    //   'PgogIC9Db250ZW50cyA1IDAgUgo+PgplbmRvYmoKCjQgMCBvYmoKPDwKICAvVHlwZSAvRm9u' +
    //   'dAogIC9TdWJ0eXBlIC9UeXBlMQogIC9CYXNlRm9udCAvVGltZXMtUm9tYW4KPj4KZW5kb2Jq' +
    //   'Cgo1IDAgb2JqICAlIHBhZ2UgY29udGVudAo8PAogIC9MZW5ndGggNDQKPj4Kc3RyZWFtCkJU' +
    //   'CjcwIDUwIFRECi9GMSAxMiBUZgooSGVsbG8sIHdvcmxkISkgVGoKRVQKZW5kc3RyZWFtCmVu' +
    //   'ZG9iagoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDEwIDAwMDAwIG4g' +
    //   'CjAwMDAwMDAwNzkgMDAwMDAgbiAKMDAwMDAwMDE3MyAwMDAwMCBuIAowMDAwMDAwMzAxIDAw' +
    //   'MDAwIG4gCjAwMDAwMDAzODAgMDAwMDAgbiAKdHJhaWxlcgo8PAogIC9TaXplIDYKICAvUm9v' +
    //   'dCAxIDAgUgo+PgpzdGFydHhyZWYKNDkyCiUlRU9G');
    // file = Uint8Array.from(binaryStr, ch => ch.charCodeAt(0));

    if (file === undefined) {
      webPdfLib.PDFViewerApplication.toolbar.eventBus.dispatch('openfile', {
        source: webPdfLib.PDFViewerApplication.toolbar,
      });
    } else {
      webPdfLib.PDFViewerApplication.open(file);
    }

    console.groupEnd();
  }

  /**
   * ACTION_ID.PRINT 액션시 호출되는 함수
   */
  static d_print() {
    console.group(`function d_print()`);
    AnnotationManager.print(webPdfLib.PDFViewerApplication.baseUrl, webPdfLib.PDFViewerApplication.pdfDocument);
    console.groupEnd();
  }

   /**
   * ACTION_ID.PASSWORD 액션시 호출되는 함수
   */
  static e_dialog_password(password) {
    if (password) {
      webPdfLib.PDFViewerApplication.passwordPrompt.verify(password);
    } else {
      EventManager.dispatch(EVENT_ID.PASSWORD, { state: 'failed' });
    }
  }

   /**
   * ACTION_ID.DOCUMENT_PROPERTIES 액션시 호출되는 함수
   */
  static d_info() {
    console.group(`function d_info()`);
    webPdfLib.PDFViewerApplication.secondaryToolbar.eventBus.dispatch('documentproperties', {
      source: webPdfLib.PDFViewerApplication.secondaryToolbar,
    });
    console.warn(`function d_info() 다이얼로그 구현 필요`);
    console.groupEnd();
  }
}
