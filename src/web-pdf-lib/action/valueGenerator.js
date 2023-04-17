import webPdfLib from '../webPdfLib.js';
// @ts-check

export const PROPERTY_VALUE_TYPE = {
  undefined: null,
  // -------------------- //
  // 도형 관련 액션 타입
  sSize: 'sSize', // 도형 크기, value = {width: 숫자, height: 숫자}
  sPosition: 'sPosition', // 도형 위치 value = {x: 숫자, y:숫자}
  sFill: 'sFill', // 채우기, value = {color: '#RRGGBB' 또는 'none' 또는 'noFill', opacity: 숫자}
  sLineFill: 'sLineFill', // 선 색 value = {lineFillType: true, color: '#RRGGBB' 또는 'none' 또는 'noFill', opacity: 숫자}
  sLineWidth: 'sLineWidth', // 선 굵기 value = {borderWidth: 숫자}
  sLineStyle: 'sLineStyle', // 선 종류 value = {compound: 'sng', borderStyleDashed: 'solid'또는'dashed_5_15'또는'dashed_10_10'또는'dashed_40_20'또는'dashed_40_20_20_20'또는'dashed_80_20'또는'dashed_80_20_20_20'또는'dashed_80_20_20_20_20_20'}
  // -------------------- //
  // -------------------- //
  // 글자 서식 관련 액션 타입
  fontName: 'fontName', // 글꼴, value: '글꼴명'
  fontSize: 'fontSize', // 글자크기, value: '숫자'
  fontColor: 'fontColor', // 글자색, value: '#RRGGBB'
  bold: 'bold', // 진하게, value : "on", "off"
  italic: 'italic', // 기울임, value : "on", "off"
  underline: 'underline', // 밑줄, value : "on", "off"
  strikethrough: 'strikethrough', // 취소선, value : "on", "off"
  // -------------------- //
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

export const COLOR_TYPE = {
  noFill: 'noFill',
  solid: 'solid',
};

export default (function () {
  return {
    /**
     * AID.FIND_OPEN 액션에 사용되는 value 생성
     * @param {enum} type - FIND_TYPE
     * @param {String} query - 찾을 내용
     * @param {boolean} caseSensitive - 대/소문자 구분
     * @param {boolean} entireWord - 단어 단위로
     * @param {boolean} highlightAll - 모두 강조 표시
     * @param {boolean} findPrevious - 찾을 방향
     *
     * @return {Object}
     */
    createFindValue(type, query, caseSensitive, entireWord, highlightAll, findPrevious) {
      return {
        source: webPdfLib.PDFViewerApplication.findBar,
        type: type,
        query: query,
        phraseSearch: true,
        caseSensitive: caseSensitive ? 1 : 0,
        entireWord: entireWord ? 1 : 0,
        highlightAll: highlightAll ? 1 : 0,
        findPrevious: findPrevious ? 1 : 0,
        matchDiacritics: false,
      };
    },
    /**
     * AID.CHANGE_PROPERTY 액션에 사용되는 value 생성
     * @param {Object} target - Annotation개체
     * @param {number} width - 너비(optional)
     * @param {number} height - 높이(optional)
     *
     * @return {Object}
     */
    createResizeValue(target, width, height) {
      return {
        target: target,
        cmdType: PROPERTY_VALUE_TYPE.sSize,
        cmdValue: {
          width: width,
          height: height,
        },
      };
    },
    /**
     * AID.CHANGE_PROPERTY 액션에 사용되는 value 생성
     * @param {Object} target - Annotation개체
     * @param {number} xPos - x좌표
     * @param {number} yPos - y좌표
     *
     * @return {Object}
     */
    createMoveValue(target, xPos, yPos) {
      return {
        target: target,
        cmdType: PROPERTY_VALUE_TYPE.sPosition,
        cmdValue: {
          x: xPos,
          y: yPos,
        },
      };
    },
    /**
     * AID.CHANGE_PROPERTY 액션에 사용되는 value 생성
     * @param {Object} target - Annotation개체
     * @param {COLOR_TYPE} colorType - 없음, 단색
     * @param {String} fillColor - 채우기 색('#RRGGBB' 형식)(optional)
     *
     * @return {Object}
     */
    createFillColorValue(target, colorType, fillColor) {
      return {
        target: target,
        cmdType: PROPERTY_VALUE_TYPE.sFill,
        cmdValue: {
          color: colorType == COLOR_TYPE.solid ? fillColor : colorType,
        },
      };
    },
    /**
     * AID.CHANGE_PROPERTY 액션에 사용되는 value 생성
     * @param {Object} target - Annotation개체
     * @param {number} opacity - 채우기 불투명도 설정(0~100사이 정수)
     *
     * @return {Object}
     */
    createFillOpacityrValue(target, fillOpacity) {
      return {
        target: target,
        cmdType: PROPERTY_VALUE_TYPE.sFill,
        cmdValue: {
          opacity: fillOpacity,
        },
      };
    },
    /**
     * AID.CHANGE_PROPERTY 액션에 사용되는 value 생성
     * @param {Object} target - Annotation개체
     * @param {COLOR_TYPE} colorType - 없음, 단색
     * @param {String} lineFillColor - 선 채우기 색('#RRGGBB' 형식)(optional)
     *
     * @return {Object}
     */
    createLineFillColorValue(target, colorType, lineFillColor) {
      return {
        target: target,
        cmdType: PROPERTY_VALUE_TYPE.sLineFill,
        cmdValue: {
          color: colorType == COLOR_TYPE.solid ? lineFillColor : colorType,
        },
      };
    },
    /**
     * AID.CHANGE_PROPERTY 액션에 사용되는 value 생성
     * @param {Object} target - Annotation개체
     * @param {number} lineFillOpacity - 선 불투명도(0~100사이 정수)
     *
     * @return {Object}
     */
    createLineFillOpacityrValue(target, lineFillOpacity) {
      return {
        target: target,
        cmdType: PROPERTY_VALUE_TYPE.sLineFill,
        cmdValue: {
          opacity: lineFillOpacity,
        },
      };
    },
    /**
     * AID.CHANGE_PROPERTY 액션에 사용되는 value 생성
     * @param {Object} target - Annotation개체
     * @param {number} lineWidth - 선 굵기(px단위)
     *
     * @return {Object}
     */
    createLineWidthValue(target, lineWidth) {
      return {
        target: target,
        cmdType: PROPERTY_VALUE_TYPE.sLineWidth,
        cmdValue: {
          borderWidth: lineWidth,
        },
      };
    },

    /**
     * AID.CHANGE_PROPERTY 액션에 사용되는 value 생성
     * @param {Object} target - Annotation개체
     * @param {LINE_STYLE} lineStyle - 선 종류
     *
     * @return {Object}
     */
    createLineStyleValue(target, lineStyle) {
      return {
        target: target,
        cmdType: PROPERTY_VALUE_TYPE.sLineStyle,
        cmdValue: {
          borderStyleDashed: lineStyle,
        },
      };
    },
    /**
     * AID.CHANGE_PROPERTY 액션에 사용되는 value 생성
     * @param {Object} target - Annotation개체
     * @param {number} fontSize - 글자크기(pt단위)
     * 
     * @return {Object}
     */
    createTexFontSizeValue(target, fontSize) {
      return {
        target: target,
        cmdType: PROPERTY_VALUE_TYPE.fontSize,
        cmdValue: fontSize,
      };
    },
    /**
     * AID.CHANGE_PROPERTY 액션에 사용되는 value 생성
     * @param {Object} target - Annotation개체
     * @param {number} fontColr - 폰트색상('#RRGGBB' 형식)
     * 
     * @return {Object}
     */
    createTexFontColorValue(target, fontColor) {
      return {
        target: target,
        cmdType: PROPERTY_VALUE_TYPE.fontColor,
        cmdValue: fontColor,
      };
    },
    /**
     * AID.CHANGE_PROPERTY 액션에 사용되는 value 생성
     * @param {Object} target - Annotation개체
     * @param {Boolean} flag - 진하게(on, off)
     * 
     * @return {Object}
     */
    createTextBoldValue(target, flag) {
      return {
        target: target,
        cmdType: PROPERTY_VALUE_TYPE.bold,
        cmdValue: flag ? 'on' : 'off',
      };
    },
    /**
     * AID.CHANGE_PROPERTY 액션에 사용되는 value 생성
     * @param {Object} target - Annotation개체
     * @param {Boolean} flag - 기울임(on, off)
     * 
     * @return {Object}
     */
    createTextItalicValue(target, flag) {
      return {
        target: target,
        cmdType: PROPERTY_VALUE_TYPE.italic,
        cmdValue: flag ? 'on' : 'off',
      };
    },
    /**
     * AID.CHANGE_PROPERTY 액션에 사용되는 value 생성
     * @param {Object} target - Annotation개체
     * @param {Boolean} flag - 밑줄(on, off)
     * 
     * @return {Object}
     */
    createTextUnderlineValue(target, flag) {
      return {
        target: target,
        cmdType: PROPERTY_VALUE_TYPE.underline,
        cmdValue: flag ? 'on' : 'off',
      };
    },
    /**
     * AID.CHANGE_PROPERTY 액션에 사용되는 value 생성
     * @param {Object} target - Annotation개체
     * @param {Boolean} flag - 취소선(on, off)
     * 
     * @return {Object}
     */
    createTextStrikethroughValue(target, flag) {
      return {
        target: target,
        cmdType: PROPERTY_VALUE_TYPE.strikethrough,
        cmdValue: flag ? 'on' : 'off',
      };
    },
  };
})();
