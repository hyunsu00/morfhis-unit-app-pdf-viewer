/**
 * 액션 ID
 * @category Action
 * @readonly
 * @const {String}
 *
 * @property {String} OPEN_FILE - 열기([value정보...]{@link AFile.d_open})
 * @property {String} SAVE - 저장하기([value정보...]{@link AFile.save})
 * @property {String} DOWNLOAD - 다운로드([value정보...]{@link AFile.download})
 * @property {String} PRINT - 인쇄([value정보...]{@link AFile.d_print})
 * @property {String} PASSWORD - 암호문서 패스워드 입력([value정보...]{@link AFile.e_dialog_password})
 * @property {String} DOCUMENT_PROPERTIES - 문서 정보([value정보...]{@link AFile.d_info})
 * @property {String} UNDO - 되돌리기([value정보...]{@link AEdit.e_undo})
 * @property {String} REDO - 다시 실행([value정보...]{@link AEdit.e_redo})
 * @property {String} COPY - 복사하기([value정보...]{@link AEdit.e_copy})
 * @property {String} DELETE - 주석 삭제([value정보...]{@link AEdit.a_delete_annotation})
 * @property {String} SELECT_ALL - 모두 선택([value정보...]{@link AEdit.e_select_all})
 * @property {String} SELECT_CLEAR - 선택 해제([value정보...]{@link AEdit.e_select_clear})
 * @property {String} FIND_OPEN - 찾기 시작([value정보...]{@link AEdit.d_find})
 * @property {String} FIND_CLOSE - 찾기 종료([value정보...]{@link AEdit.d_find_close})
 * @property {String} ZOOM - 확대/축소([value정보...]{@link AView.zoom})
 * @property {String} THUMBNAIL_VIEW - 문서창(썸네일)([value정보...]{@link AView.thumnailView})
 * @property {String} SLIDESHOW_FIRST - 쇼 보기([value정보...]{@link ASlideshow.slideshow_first})
 * @property {String} SLIDESHOW_CURRENT - 현재 슬라이드부터 쇼 보기([value정보...]{@link ASlideshow.slideshow_current})
 * @property {String} SELECT_DRAW_TOOL - 주석 추가([value정보...]{@link AAnnotation.select})
 * @property {String} QUICK_UNDERLINE - 빠른 밑줄 추가([value정보...]{@link AAnnotation.a_quick_underline})
 * @property {String} QUICK_STRIKEOUT - 빠른 취소선 추가([value정보...]{@link AAnnotation.a_quick_strikeout})
 * @property {String} QUICK_HIGHLIGHT - 빠른 형광펜 추가([value정보...]{@link AAnnotation.a_quick_highlight})
 * @property {String} CHANGE_PROPERTY - 주석 속성 변경([value정보...]{@link AAnnotation.a_property})
 * @property {String} SELECT_CURSOR - 선택/손도구 설정([value정보...]{@link ATool.switchcursortool})
 * @property {String} FIRST_PAGE - 처음페이지 이동([value정보...]{@link APage.e_first_page})
 * @property {String} PREV_PAGE - 이전 페이지 이동([value정보...]{@link APage.e_previous_page})
 * @property {String} NEXT_PAGE - 다음 페이지 이동([value정보...]{@link APage.e_next_page})
 * @property {String} LAST_PAGE - 마지막 페이지 이동([value정보...]{@link APage.e_last_page})
 * @property {String} GOTO_PAGE - 페이지 이동([value정보...]{@link APage.page_number})
 */

export const ACTION_ID = {
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
  SELECT_CLEAR: 'e_select_clear',
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

export default ACTION_ID;
