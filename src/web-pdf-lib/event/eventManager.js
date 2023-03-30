export default (function () {
  return {
    on(eventName, listener) {
      document.addEventListener(eventName, listener);
    },
    off(eventName, listener) {
      document.removeEventListener(eventName, listener);
    },
    dispatch(eventName, data) {
      document.dispatchEvent(new CustomEvent(eventName, { detail: data }));
    },
	  onDocumentLoaded: 'onDocumentLoaded',
	  onUpdateUi: 'onUpdateUi',
    onQuickMenu: 'onQuickMenu',
    onError: 'onError',
    onPassword: 'onPassword',
    onDocumentSummary: 'onDocumentSummary',
    onAnnotationSelected : 'onAnnotationSelected',
    onAnnotationUnSelected : 'onAnnotationUnSelected',
    onAnnotationMenu: 'onAnnotationMenu',
  };
})();
