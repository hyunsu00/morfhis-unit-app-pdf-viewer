// pdfjsApp.js
import PDFJsListener from './listener/pdfjsListener.js';
import AnnotationManager from './annotation/annotationManager.js';
import UndoRedoManager from './undoRedo/UndoRedoManager.js';

export default (function () {
  return {
    initialize(lipsPath) {
      console.log(`[webPdfLib.initialize(lipsPath) Begin]`);
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

          import(/* webpackIgnore: true */ `${lipsPath}/pdf-annotate.min.js`)
            .then((module) => {
              AnnotationManager.initialize(window.PDFAnnotate['default']);
              window.PDFApp = window.PDFViewerApplication;
              window.PDFAppOptions = window.PDFViewerApplicationOptions;
              window.AnnotationManager = AnnotationManager;
              window.gUndoRedoManager = new UndoRedoManager(window.PDFViewerApplication.baseUrl);
            })
            .catch((err) => {
              console.log(`[import(/* webpackIgnore: true */ ${lipsPath}/pdf-annotate.min.js) Failed] : ${err.message}`);
            });

          import(/* webpackIgnore: true */ `${lipsPath}/annotpdf.js`)
            .then((module) => {
              window.PDFAnnotateWriter = window.pdfAnnotate;
            })
            .catch((err) => {
              console.log(`[import(/* webpackIgnore: true */ ${lipsPath}/annotpdf.min.js) Failed] : ${err.message}`);
            });

          import(/* webpackIgnore: true */ `${lipsPath}/pdf-lib.js`)
            .then((module) => {
              window.PDFLib = window.PDFLib;
            })
            .catch((err) => {
              console.log(`[import(/* webpackIgnore: true */ ${lipsPath}/pdf-lib.js) Failed] : ${err.message}`);
            });
        })
        .catch((err) => {
          console.log(`[import(/* webpackIgnore: true */ ${lipsPath}/pdfjs/web/viewer.js) Failed] : ${err.message}`);
        });
      console.log(`[webPdfLib.initialize(lipsPath) End]`);
    },
  };
})();
