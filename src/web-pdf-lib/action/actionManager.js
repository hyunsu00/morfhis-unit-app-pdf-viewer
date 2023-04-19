// antionManager.js
import AID from '../define/actionDefines.js'
import AFile from './AFile.js';
import AEdit from './AEdit.js';
import AView from './AView.js';
import AAnnotation from './AAnnotation.js';
import ASlideshow from './ASlideshow.js';
import ATool from './ATool.js';
import APage from './APage.js';

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
    Execute(aID, value) {
      let action = _actionMap.get(aID);
      if (action) {
        action(value);
      }
    },
  };
})();
