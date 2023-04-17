import { DRAW_TYPE } from './actionManager.js';
import UiManager from '../uiFrame/uiManager.js';
import EventManager from '../event/eventManager.js';
import AnnotationManager from '../annotation/annotationManager.js';

export default class AAnnotation {
  static _ToAnnotationType(drawType) {
    let annotationType = null;
    switch (drawType) {
      case DRAW_TYPE.LINE:
        annotationType = 'line';
        break;
      case DRAW_TYPE.AREA:
        annotationType = 'area';
        break;
      case DRAW_TYPE.PEN:
        annotationType = 'draw';
        break;
      case DRAW_TYPE.MEMO:
        annotationType = 'point';
        break;
      case DRAW_TYPE.TEXT:
        annotationType = 'text';
        break;
      case DRAW_TYPE.UNDERLINE:
        annotationType = 'underline';
        break;
      case DRAW_TYPE.STRIKEOUT:
        annotationType = 'strikeout';
        break;
      case DRAW_TYPE.HIGHLIGHT:
        annotationType = 'highlight';
        break;
      default:
        break;
    }

    return annotationType;
  }

  static select(drawType) {
    let annotationType = AAnnotation._ToAnnotationType(drawType);
    if (AnnotationManager.annotationType === annotationType) {
      annotationType = 'cursor';
    }
    AnnotationManager.switchUI(annotationType);
  }
  static a_line(_event) {
    AAnnotation.select(DRAW_TYPE.LINE);
  }
  static a_area(_event) {
    AAnnotation.select(DRAW_TYPE.AREA);
  }
  static a_draw(_event) {
    AAnnotation.select(DRAW_TYPE.PEN);
  }
  static a_point(_event) {
    AAnnotation.select(DRAW_TYPE.MEMO);
  }
  static a_text(_event) {
    AAnnotation.select(DRAW_TYPE.TEXT);
  }
  static a_underline(_event) {
    if (UiManager.isSelectedAllRange()) {
      EventManager.dispatch('onError', { errType: 'ERR_ALL_SELECTED' });
      return;
    }
    const range = UiManager.getRange();
    if (range && !range.collapsed) {
      AAnnotation.a_quick_underline(range);
    } else {
      AAnnotation.select(DRAW_TYPE.UNDERLINE);
    }
  }
  static a_strikeout(_event) {
    if (UiManager.isSelectedAllRange()) {
      EventManager.dispatch('onError', { errType: 'ERR_ALL_SELECTED' });
      return;
    }

    const range = UiManager.getRange();
    if (range && !range.collapsed) {
      AAnnotation.a_quick_strikeout(range);
    } else {
      AAnnotation.select(DRAW_TYPE.STRIKEOUT);
    }
  }
  static a_highlight(_event) {
    if (UiManager.isSelectedAllRange()) {
      EventManager.dispatch('onError', { errType: 'ERR_ALL_SELECTED' });
      return;
    }

    const range = UiManager.getRange();
    if (range && !range.collapsed) {
      AAnnotation.a_quick_highlight(range);
    } else {
      AAnnotation.select(DRAW_TYPE.HIGHLIGHT);
    }
  }
  static a_quick_underline(range) {
    let rects = range.getClientRects();
    AnnotationManager.saveRect('underline', rects);
  }
  static a_quick_strikeout(range) {
    let rects = range.getClientRects();
    AnnotationManager.saveRect('strikeout', rects);
  }
  static a_quick_highlight(range) {
    let rects = range.getClientRects();
    AnnotationManager.saveRect('highlight', rects);
  }
  static a_property(value) {
    const { target, cmdType, cmdValue } = value;
    AnnotationManager.execCommand(cmdType, cmdValue, target);
  }
}
