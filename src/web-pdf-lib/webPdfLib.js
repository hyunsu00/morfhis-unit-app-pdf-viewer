// pdfjsApp.js
import PDFJsListener from './listener/pdfjsListener.js';
import AnnotationManager from './annotation/annotationManager.js';
import UndoRedoManager from './undoRedo/UndoRedoManager.js';

export default (function () {
  return {
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
  };
})();
