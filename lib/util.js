/**
 * @module Util
 * @description
 *   Internal Utility methods
 */

/**
 * @function
 * @param  {string} str the string to convert
 * @return {string} the string in under_scores
 * @description
 *   Converts a string from camelCase to underscore_case
 */
function camelToUnderscore(str) {
	return str.replace(/\W+/g, '-')
		.replace(/([a-z\d])([A-Z])/g, '$1_$2')
		.toLowerCase();
}

/**
 * @function
 * @param  {string} str the string to convert
 * @return {string} the string in camelCase
 * @description
 *   Converts a string from underscore_case to camelCase
 */
function underscoreToCamel(str) {
	return str.replace(/_([a-z])/g, g => g[1].toUpperCase());
}

/**
 * @function
 * @param  {object} obj the object to massage the property names for
 * @param  {function} conversionFn the function to be called passing the object key
 * @param  {object} [newObject] the new object that is assembled (used in recursive calls)
 * @return {object} a new object with the properties massaged by conversionFn
 * @description
 *   Converts all the keys of an object by a conversionFn and returns a new object with the updated properties
 */
function convert(obj, conversionFn, newObject) {
	if (!obj) {
		return obj;
	}
	if (!newObject) {
		newObject = {};
	}

	Object.keys(obj).forEach((prop) => {
		if (typeof obj[prop] === 'object' && obj[prop]) {
			const convertObj = newObject[conversionFn(prop)] = {};
			convert(obj[prop], conversionFn, convertObj);
		} else {
			newObject[conversionFn(prop)] = obj[prop];
		}
	});
	return newObject;
}

module.exports = {
	convert: convert,
	camelToUnderscore: camelToUnderscore,
	/**
	 * @function
	 * @methodof Util
	 * @param  {object} a a javascript object
	 * @return {string} the jquery-like querystring to send to the api
	 * @description
	 *   Ripped from https://github.com/knowledgecode/jquery-param
	 */
	serializeToQSParams: require('./param-serializer'),
	underscoreToCamel: underscoreToCamel
};
