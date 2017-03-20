function camelToUnderscore(str) {
	return str.replace(/\W+/g, '-')
		.replace(/([a-z\d])([A-Z])/g, '$1_$2')
		.toLowerCase();
}

function underscoreToCamel(str) {
	return str.replace(/_([a-z])/g, g => g[1].toUpperCase());
}

function convert(obj, conversionFn, newObject) {
	if (!obj) {
		return obj;
	}
	if (!newObject) {
		newObject = {};
	}

	Object.keys(obj).forEach((prop) => {
		if (typeof obj[prop] === 'object') {
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
	serializeToQSParams: require('./param-serializer'),
	underscoreToCamel: underscoreToCamel
};
