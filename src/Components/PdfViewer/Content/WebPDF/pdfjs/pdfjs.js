
const import_pdfjs = () => {
  console.log(`[import_pdfjs() Begin]`);
  import(/* webpackIgnore: true */ `${process.env.PUBLIC_URL}/external/pdfjs/web/viewer.js`) // 절대경로
    .then((module) => {
      const _appOptions = window.PDFViewerApplicationOptions;
      _appOptions.set(
        "workerSrc",
        `${process.env.PUBLIC_URL}/external/pdfjs/build/pdf.worker.js`
      ); // 절대경로
      _appOptions.set(
        "defaultUrl",
        `${process.env.PUBLIC_URL}/external/pdfjs/web/compressed.tracemonkey-pldi-09.pdf`
      ); // 절대경로

      console.log(`[import() Succeeded] : ${process.env.PUBLIC_URL}/external/pdfjs/web/viewer.js`);
    })
    .catch((err) => {
      console.log(`[import() Failed] : ${err.message}`);
    });
  console.log(`[import_pdfjs() End]`);
};

export default import_pdfjs;