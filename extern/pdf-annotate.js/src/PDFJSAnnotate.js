import StoreAdapter from './adapter/StoreAdapter';
import LocalStoreAdapter from './adapter/LocalStoreAdapter';
import LocalUserStoreAdapter from './adapter/LocalUserStoreAdapter';
import render from './render';
import {
  appendChild, 
  replaceChild, 
  insertBefore
} from './render/appendChild';
import { calcAnnotationContentSize, createAnnotationContentImage } from './render/renderUtils';
import UI from './UI';
import config from './config';
import uuid from './utils/uuid';
import {
  findAnnotationAtPoint,
  findSVGContainer,
  convertToScreenPoint,
  convertToSvgRect,
  getOffsetAnnotationRect,
  getSVGElement
} from './UI/utils';
import { 
  ToSmoothLines, 
  smoothing 
} from './utils/smoothLines';

export default {
  findAnnotationAtPoint,
  findSVGContainer,
  convertToScreenPoint,
  convertToSvgRect,
  getOffsetAnnotationRect,
  getSVGElement,

  /**
   * Abstract class that needs to be defined so PDFJSAnnotate
   * knows how to communicate with your server.
   */
  StoreAdapter,

  /**
   * Implementation of StoreAdapter that stores annotation data to localStorage.
   */
  LocalStoreAdapter,

  /**
   * Implementation of StoreAdapter that stores annotation data to localStorage particular
   * to a specific user
   */
  LocalUserStoreAdapter,

  /**
   * Abstract instance of StoreAdapter
   */
  __storeAdapter: new StoreAdapter(),

  /**
   * Getter for the underlying StoreAdapter property
   *
   * @return {StoreAdapter}
   */
  getStoreAdapter() {
    return this.__storeAdapter;
  },

  /**
   * Setter for the underlying StoreAdapter property
   *
   * @param {StoreAdapter} adapter The StoreAdapter implementation to be used.
   */
  setStoreAdapter(adapter) {
    // TODO this throws an error when bundled
    // if (!(adapter instanceof StoreAdapter)) {
    //   throw new Error('adapter must be an instance of StoreAdapter');
    // }

    this.__storeAdapter = adapter;
  },

  /**
   * UI is a helper for instrumenting UI interactions for creating,
   * editing, and deleting annotations in the browser.
   */
  UI,

  /**
   * Render the annotations for a page in the PDF Document
   *
   * @param {SVGElement} svg The SVG element that annotations should be rendered to
   * @param {PageViewport} viewport The PDFPage.getViewport data
   * @param {Object} data The StoreAdapter.getAnnotations data
   * @return {Promise}
   */
  render,

  appendChild,

  replaceChild, 

  insertBefore,

  calcAnnotationContentSize,

  createAnnotationContentImage,

  /**
   * Convenience method for getting annotation data
   *
   * @alias StoreAdapter.getAnnotations
   * @param {String} documentId The ID of the document
   * @param {String} pageNumber The page number
   * @return {Promise}
   */
  getAnnotations(documentId, pageNumber) {
    return this.getStoreAdapter().getAnnotations(...arguments);
  },

  config,

  uuid,

  ToSmoothLines, 
  smoothing 
};
