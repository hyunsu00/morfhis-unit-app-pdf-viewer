// @ts-check

/**
 * 찾기 타입 열거
 * @readonly
 * @enum {String}
 *
 * @property {String} FIND_AGAIN - 다음 찾기
 * @property {String} FIND_HIGHLIGHTALL_CHANGE - 모두 강조 표시
 * @property {String} FIND_CASESENSITIVITY_CHANGE - 대/소문자 구분
 * @property {String} FIND_ENTIREWORD_CHANGE - 단어 단위로
 */
export const FIND_TYPE = {
  FIND_AGAIN: 'again',
  FIND_HIGHLIGHTALL_CHANGE: 'highlightallchange',
  FIND_CASESENSITIVITY_CHANGE: 'casesensitivitychange',
  FIND_ENTIREWORD_CHANGE: 'entirewordchange',
};

/**
 * 주석 타입 열거
 * @readonly
 * @enum {String}
 *
 * @property {String} LINE - 선 그리기
 * @property {String} AREA - 직사각형
 * @property {String} PEN - 자유형 그리기
 * @property {String} MEMO - 스티커 노트
 * @property {String} TEXT - 텍스트
 * @property {String} UNDERLINE - 밑줄
 * @property {String} STRIKEOUT - 취소선
 * @property {String} HIGHLIGHT - 형광펜
 */
export const DRAW_TYPE = {
  LINE: 'a_line',
  AREA: 'a_area',
  PEN: 'a_draw',
  MEMO: 'a_point',
  TEXT: 'a_text',
  UNDERLINE: 'a_underline',
  STRIKEOUT: 'a_strikeout',
  HIGHLIGHT: 'a_highlight',
};

/**
 * 커서 타입 열거
 * @readonly
 * @enum {String}
 *
 * @property {String} SELECT - 선택
 * @property {String} HAND - 손도구
 */
export const CURSOR_TYPE = {
  SELECT: 't_select',
  HAND: 't_hand,',
};

/**
 * 선 종류 열거
 * @readonly
 * @enum {String}
 *
 */
export const LINE_STYLE = {
  none: 'none',
  dashed_5_15: 'dashed_5_15',
  dashed_10_10: 'dashed_10_10',
  dashed_40_20: 'dashed_40_20',
  dashed_40_20_20_20: 'dashed_40_20_20_20',
  dashed_80_20: 'dashed_80_20',
  dashed_80_20_20_20: 'dashed_80_20_20_20',
  dashed_80_20_20_20_20_20: 'dashed_80_20_20_20_20_20',
};

/**
 * 색상 타입 열거
 * @readonly
 * @enum {String}
 * 
 * @property {String} noFill - 없음
 * @property {String} solid - 단색
 */
export const COLOR_TYPE = {
  noFill: 'noFill',
  solid: 'solid',
};
