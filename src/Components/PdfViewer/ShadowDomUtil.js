export const ShadowDomUtil = {
  shadowDomElementId: 'pdf-viewer-shadow-dom',

  getElementById(elementId) {
    let element = document.getElementById(elementId);
    if (element === null) {
      let shadowDomElement = document.getElementById(this.shadowDomElementId);
      if (shadowDomElement !== null) {
        let shadowRoot = shadowDomElement.shadowRoot;
        if (shadowRoot !== null) {
          element = shadowRoot.getElementById(elementId);
        }
      }
    }
    return element;
  },
};
