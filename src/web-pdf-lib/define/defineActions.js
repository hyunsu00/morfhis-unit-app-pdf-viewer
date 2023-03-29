export default {

	/**
	 * @typedef {String} ActionType
	 * @enum {ActionType}
	 */
	type: {
		undefined: null,
		// -------------------- //
		// 도형 관련 액션 타입
		sSize: "sSize", // 도형 크기, value = {width: 숫자, height: 숫자}
		sFill: "sFill", // 채우기, value = {color: '#RRGGBB' 또는 'none' 또는 'noFill', opacity: 숫자}
		sLineFill: "sLineFill", // 선 색 value = {lineFillType: true, color: '#RRGGBB' 또는 'none' 또는 'noFill', opacity: 숫자}
		sLineWidth: "sLineWidth", // 선 굵기 value = {borderWidth: 숫자}
		sLineStyle: "sLineStyle", // 선 종류 value = {compound: 'sng', borderStyleDashed: 'solid'또는'dashed_5_15'또는'dashed_10_10'또는'dashed_40_20'또는'dashed_40_20_20_20'또는'dashed_80_20'또는'dashed_80_20_20_20'또는'dashed_80_20_20_20_20_20'}
		sPosition: "sPosition", // 도형 위치 value = {x: 숫자, y:숫자}
		// -------------------- //
		// -------------------- //
		// 글자 서식 관련 액션 타입
		fontName: "fontName", // 글꼴, value: '글꼴명'
		fontSize: "fontSize", // 글자크기, value: '숫자'
		fontColor: "fontColor", // 글자색, value: '#RRGGBB'
		bold: "bold", // 진하게, value : "on", "off"
		italic: "italic", // 기울임, value : "on", "off"
		underline: "underline", // 밑줄, value : "on", "off"
		strikethrough: "strikethrough" // 취소선, value : "on", "off"
		// -------------------- //
	},

	/**
	 * @typedef {String} UIActionValue
	 * @enum {UIActionValue}
	 */
	uiValue: {
		undefined: "",
		zoomIn: "zoom_in",
		zoomOut: "zoom_out",
		fitWidth: "fitWidth",
		zoomFixWidth: "zoom_fit_width",
		zoomFit: "zoom_fit",
		zoomFix: "zoom_fix"
	}
};