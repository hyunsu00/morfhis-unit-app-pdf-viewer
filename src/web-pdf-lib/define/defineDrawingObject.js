export default {
	/**
	 * @typedef {String} FillType
	 * @enum {FillType}
	 */
	fillType: {
		noFill: "noFill",
		solidFill: "solidFill",
		gradFill: "gradFill",
		blipFill: "blipFill",
		pattFill: "pattFill",
		grpFill: "grpFill"
	},

	/**
	 * @typedef {String} LineCap
	 * @enum {LineCap}
	 */
	lineCap: {
		rnd: "rnd",
		sq: "sq",
		flat: "flat"
	},

	/**
	 * @typedef {String} CompoundLine
	 * @enum {CompoundLine}
	 */
	compoundLine: {
		sng: "sng",
		dbl: "dbl",
		thickThin: "thickThin",
		thinThick: "thinThick",
		tri: "tri"
	},

	/**
	 * @typedef {String} lineDash
	 * @enum {lineDash}
	 */
	lineDash: {
		solid: "solid",
		dot: "dot",
		dash: "dash",
		lgDash: "lgDash",
		dashDot: "dashDot",
		lgDashDot: "lgDashDot",
		lgDashDotDot: "lgDashDotDot",
		sysDash: "sysDash",
		sysDot: "sysDot",
		sysDashDot: "sysDashDot",
		sysDashDotDot: "sysDashDotDot"
	},

	/**
	 * @typedef {String} lineJoin
	 * @enum {lineJoin}
	 */
	lineJoin: {
		round: "round",
		bevel: "bevel",
		miter: "miter"
	},

	defaultShapeColor: {
		fill: {
			rgb: [91, 155, 213],
			hex: "#5b9bd5"
		},
		line: {
			rbg: [65, 113, 156],
			hex: "#41719c"
		}
	},
	
	XML_NS_XLINK: "http://www.w3.org/1999/xlink"
};