import webPdfLib from '../webPdfLib.js';
// @ts-check

export default (function () {
  /**
   * 찾기 타입 열거
   * @readonly
   * @enum {String}
   * @property {String} FIND_AGAIN - 다음 찾기
   * @property {String} FIND_HIGHLIGHTALL_CHANGE - 모두 강조 표시
   * @property {String} FIND_CASESENSITIVITY_CHANGE - 대/소문자 구분
   * @property {String} FIND_ENTIREWORD_CHANGE - 단어 단위로
   */
  const FIND_TYPE = {
    FIND_AGAIN: 'again',
    FIND_HIGHLIGHTALL_CHANGE: 'highlightallchange',
    FIND_CASESENSITIVITY_CHANGE: 'casesensitivitychange',
    FIND_ENTIREWORD_CHANGE: 'entirewordchange',
  };
  return {
    /**
     * @property {FIND_TYPE} FIND_TYPE - 찾기 타입
     */
    FIND_TYPE: FIND_TYPE,
    /**
     * d_find 액션에 사용되는 value 생성
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
  };
})();
