// antionManager.js
/*
import UiController from '../../../commonFrame/js/uiFramework/uiController.js';
import EventActionGenerator from '../../../commonFrame/js/uiFramework/eventActionGenerator.js';
import UIDefine from '../../../commonFrame/js/uiFramework/uiDefine.js';
*/

import AnnotationManager from '../annotation/annotationManager.js';

import AFile from './AFile.js';
import AEdit from './AEdit.js';
import AView from './AView.js';
import AAnnotation from './AAnnotation.js';
import ASlideshow from './ASlideshow.js';
import ATool from './ATool.js';
import APage from './APage.js';

export const AID = {
  //
  // 파일
  //
  OPEN_FILE: 'd_open',
  SAVE: 'd_save', // ! 구현 필요
  DOWNLOAD: 'd_download',
  PRINT: 'd_print',
  PASSWORD: 'e_dialog_password',
  DOCUMENT_PROPERTIES: 'd_info',
  //
  // 편집
  //
  UNDO: 'e_undo',
  REDO: 'e_redo',
  COPY: 'e_copy',
  DELETE: 'a_delete_annotation',
  SELECT_ALL: 'e_select_all',
  // 찾기
  FIND_OPEN: 'd_find',
  FIND_CLOSE: 'd_find_close',
  //
  // 보기
  //
  // 줌
  ZOOM: 'e_zoom',
  // 썸네일 뷰
  THUMBNAIL_VIEW: 'document_window',
  //
  // 슬라이드쇼
  //
  SLIDESHOW_FIRST: 'e_show_mode_start',
  SLIDESHOW_CURRENT: 'e_show_mode',
  //
  // 주석
  //
  SELECT_DRAW_TOOL: 'a_select_draw_tool',
  QUICK_UNDERLINE: 'a_quick_underline',
  QUICK_STRIKEOUT: 'a_quick_strikeout',
  QUICK_HIGHLIGHT: 'a_quick_highlight',
  CHANGE_PROPERTY: 'a_property',
  //
  // 도구
  //
  SELECT_CURSOR: 'switchcursortool',

  //
  // 페이지 이동
  //
  FIRST_PAGE: 'e_first_page',
  PREV_PAGE: 'e_previous_page',
  NEXT_PAGE: 'e_next_page',
  LAST_PAGE: 'e_last_page',
  GOTO_PAGE: 'page_number',
};

export const DRAW_TYPE = {
  LINE: 'a_line',
  AREA: 'a_area',
  PEN: 'a_draw',
  MEMO: 'a_point',
  TEXT: 'a_text',
  STRIKEOUT: 'a_strikeout',
  UNDERLINE: 'a_underline',
  HIGHLIGHT: 'a_highlight',
};

export const CURSOR_TYPE = {
  SELECT: 't_select',
  HAND: 't_hand,',
};

export default (function () {
  const _actionMap = (function () {
    return new Map([
      // 파일메뉴
      [AID.SAVE, AFile.save],
      [AID.DOWNLOAD, AFile.download],
      [AID.OPEN_FILE, AFile.d_open],
      [AID.PRINT, AFile.d_print],
      [AID.PASSWORD, AFile.e_dialog_password],
      [AID.DOCUMENT_PROPERTIES, AFile.d_info],
      // 편집메뉴
      [AID.UNDO, AEdit.e_undo],
      [AID.REDO, AEdit.e_redo],
      [AID.COPY, AEdit.e_copy],
      [AID.DELETE, AEdit.a_delete_annotation],
      [AID.SELECT_ALL, AEdit.e_select_all],
      [AID.FIND_OPEN, AEdit.d_find],
      [AID.FIND_CLOSE, AEdit.d_find_close],
      // 보기
      [AID.ZOOM, AView.zoom],
      [AID.THUMBNAIL_VIEW, AView.thumnailView],
      // 주석
      [AID.SELECT_DRAW_TOOL, AAnnotation.select],
      [AID.QUICK_UNDERLINE, AAnnotation.a_quick_underline],
      [AID.QUICK_STRIKEOUT, AAnnotation.a_quick_strikeout],
      [AID.QUICK_HIGHLIGHT, AAnnotation.a_quick_highlight],
      [AID.CHANGE_PROPERTY, AAnnotation.a_property],
      // 슬라이드쇼
      [AID.SLIDESHOW_FIRST, ASlideshow.slideshow_first],
      [AID.SLIDESHOW_CURRENT, ASlideshow.slideshow_current],
      // 도구
      [AID.SELECT_CURSOR, ATool.switchcursortool],
      // 페이지
      [AID.FIRST_PAGE, APage.e_first_page],
      [AID.PREV_PAGE, APage.e_previous_page],
      [AID.NEXT_PAGE, APage.e_next_page],
      [AID.LAST_PAGE, APage.e_last_page],
      [AID.GOTO_PAGE, APage.page_number],
    ]);
  })();

  return {
    execute(evtAction) {
      let action = _actionMap.get(evtAction.name);
      if (action) {
        action(evtAction);
      }
    },
    Execute(aID, value) {
      let action = _actionMap.get(aID);
      if (action) {
        action(value);
      }
    },
  };
})();
