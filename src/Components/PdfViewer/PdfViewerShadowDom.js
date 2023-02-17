import ReactDOM from 'react-dom';
import { useEffect, useState } from 'react';
import { ShadowDomUtil } from './ShadowDomUtil';
import PdfViewerFrame from './PdfViewerFrame';

function PdfViewerShadowDom({ parentLocale }) {
  const [shadowRootElement, setShadowRootElement] = useState(undefined);
  const [cacheContainer, setCacheContainer] = useState(undefined);

  useEffect(() => {
    if (shadowRootElement === undefined || cacheContainer === undefined) {
      return;
    }

    ReactDOM.render(<PdfViewerFrame parentLocale={parentLocale} cacheContainer={cacheContainer} themeContainer={shadowRootElement} />, shadowRootElement);

    // eslint-disable-next-line
  }, [parentLocale, shadowRootElement]);

  useEffect(() => {
    const container = document.querySelector('#' + ShadowDomUtil.shadowDomElementId);
    const shadowContainer = container.attachShadow({ mode: 'open' });
    const styleRoot = document.createElement('style');
    styleRoot.setAttribute('id', ShadowDomUtil.shadowDomElementId + '-style');
    const shadowRootElement = document.createElement('div');
    shadowRootElement.setAttribute('id', ShadowDomUtil.shadowDomElementId + '-root');
    shadowContainer.appendChild(styleRoot);
    shadowContainer.appendChild(shadowRootElement);
    setCacheContainer(styleRoot);

    setShadowRootElement(shadowRootElement);
    addStyleUsedInShadowDom(styleRoot);

    // eslint-disable-next-line
  }, []);

  const addStyleUsedInShadowDom = (styleRoot) => {
    if (styleRoot === null) {
      return;
    }

    let textNode =
      // '--scrollbar-thumb-background-color: rgba(255, 255, 255, 0.6);\n' +
      '::-webkit-scrollbar {\n' +
      '      width: 6px !important;\n' +
      '      height: 6px !important;' +
      '}\n' +
      '\n' +
      '::-webkit-scrollbar-track {\n' +
      '      background-color: transparent !important;' +
      '}\n' +
      '\n' +
      '::-webkit-scrollbar-thumb {\n' +
      '      border-radius: 4px !important;\n' +
      '      background-color: var(--scrollbar-thumb-background-color, rgba(255, 255, 255, 0.6)) !important;' +
      '}\n' +
      '\n' +
      '::-webkit-scrollbar-button {\n' +
      '      width: 0px !important;\n' +
      '      height: 0px !important; }\n' +
      '\n' +
      '::-webkit-scrollbar-corner {\n' +
      '      background-color: transparent !important;' +
      '}';
    let style = ShadowDomUtil.getElementById('shadow-scrollbar-style');
    if (style === null) {
      style = document.createElement('style');
      style.id = 'shadow-scrollbar-style';
    }
    style.innerText = '';
    style.appendChild(document.createTextNode(textNode));
    styleRoot.appendChild(style);
  };

  return <div id={ShadowDomUtil.shadowDomElementId}></div>;
}

export default PdfViewerShadowDom;
