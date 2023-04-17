/**
 * 찾기 타입 열거
 * @readonly
 * @enum {String}
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

  export const LINE_STYLE = {
	dashed_5_15: 'dashed_5_15',
	dashed_10_10: 'dashed_10_10',
	dashed_40_20: 'dashed_40_20',
	dashed_40_20_20_20: 'dashed_40_20_20_20',
	dashed_80_20: 'dashed_80_20',
	dashed_80_20_20_20: 'dashed_80_20_20_20',
	dashed_80_20_20_20_20_20: 'dashed_80_20_20_20_20_20',
  };
  
  export const COLOR_TYPE = {
	noFill: 'noFill',
	solid: 'solid',
  };