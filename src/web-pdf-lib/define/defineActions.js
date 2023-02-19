export default {

	/**
	 * @typedef {String} ActionType
	 * @enum {ActionType}
	 */
	type: {
		undefined: null,
		sSize: "sSize",
		sFill: "sFill",
		sLineFill: "sLineFill",
		sLineWidth: "sLineWidth",
		sLineStyle: "sLineStyle",
		sPosition: "sPosition",
		fontName: "fontName",
		fontSize: "fontSize",
		fontColor: "fontColor",
		bold: "bold",
		italic: "italic",
		underline: "underline",
		strikethrough: "strikethrough"
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