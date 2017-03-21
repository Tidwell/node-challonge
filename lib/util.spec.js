const util = require('./util');

describe('util methods', () => {
	describe('serializeToQSParams', () => {
		it('should return a serialized string and a properties array', () => {
			expect(util.serializeToQSParams({})).toEqual('');
		});

		it('should work with flat values', () => {
			expect(util.serializeToQSParams({
				prop: 'value',
				anotherProp: 123,
				someOtherProp: true
			})).toEqual('prop=value&anotherProp=123&someOtherProp=true');
		});

		it('should flatten nested objects', () => {
			expect(util.serializeToQSParams({
				prop: {
					nestedProp: 'nestedVal'
				}
			})).toEqual('prop[nestedProp]=nestedVal');
		});

		it('should not fail on null values', () => {
			expect(util.serializeToQSParams({
				prop: {
					nestedProp: null
				}
			})).toEqual('prop[nestedProp]=');
		});

		it('should flatten deep nested', () => {
			expect(util.serializeToQSParams({
				prop: {
					nestedProp: {
						deepNestedProp: true
					},
					nestedVal: false
				}
			})).toEqual('prop[nestedProp][deepNestedProp]=true&prop[nestedVal]=false');
		});
	});

	const tests = [
		['myProperty', 'my_property'],
		['myOtherProperty', 'my_other_property'],
		['withNumbers9Thing', 'with_numbers9_thing'],
		['9Prop', '9_prop']
	];
	describe('camelToUnderscore', () => {
		const extraTests = [
			['withLOW', 'with_low'],
			['some kind of string', 'some-kind-of-string'],
			['some kind of stringWithCamel', 'some-kind-of-string_with_camel']
		];
		it('should convert a variety of cases', () => {
			const allTests = tests.concat(extraTests);
			allTests.forEach((item, index) => {
				expect(util.camelToUnderscore(item[0])).toEqual(item[1]);
			});
		});
	});

	describe('underscoreToCamel', () => {
		it('should invert the same cases as camelToUnderscore', () => {
			tests.forEach((item, index) => {
				expect(util.underscoreToCamel(tests[index][1])).toEqual(tests[index][0]);
			});
		});
	});

	describe('convert', () => {
		it('should convert properties with a conversion function', () => {
			expect(util.convert({}, util.underscoreToCamel)).toEqual({});
		});

		it('should convert properties with a conversion function', () => {
			expect(util.convert({
				some_prop: 123
			}, util.underscoreToCamel)).toEqual({
				someProp: 123
			});
		});

		it('should convert properties that are nested', () => {
			expect(util.convert({
				some_prop: {
					another_thing: 123
				}
			}, util.underscoreToCamel)).toEqual({
				someProp: {
					anotherThing: 123
				}
			});
		});

		it('should convert properties that are deeply', () => {
			expect(util.convert({
				some_prop: {
					another_thing: {
						one_more_level: 'a thingie'
					}
				}
			}, util.underscoreToCamel)).toEqual({
				someProp: {
					anotherThing: {
						oneMoreLevel: 'a thingie'
					}
				}
			});
		});
	});

	describe('conversion', () => {
		it('should return what was passed if it is falsy', () => {
			expect(util.convert(undefined)).toEqual(undefined);
		});
		it('should work with no props', () => {
			expect(util.convert({}, util.underscoreToCamel)).toEqual({});
		});

		it('should work with a single layer props', () => {
			expect(util.convert({
				top_prop: 123
			}, util.underscoreToCamel)).toEqual({
				topProp: 123
			});
		});

		it('should work with a nested props', () => {
			expect(util.convert({
				top_prop: {
					middle_prop: 123
				}
			}, util.underscoreToCamel)).toEqual({
				topProp: {
					middleProp: 123
				}
			});
		});

		it('should work with a null value', () => {
			expect(util.convert({
				top_prop: {
					middle_prop: null
				}
			}, util.underscoreToCamel)).toEqual({
				topProp: {
					middleProp: null
				}
			});
		});

		it('should work with both top and nested properties', () => {
			expect(util.convert({
				top_prop: {
					middle_prop: 123
				},
				also_top: 'a string'
			}, util.underscoreToCamel)).toEqual({
				topProp: {
					middleProp: 123
				},
				alsoTop: 'a string'
			});
		});

		it('should work with a different conversion function', () => {
			expect(util.convert({
				topProp: {
					middleProp: 123
				},
				alsoTop: 'a string'
			}, util.camelToUnderscore)).toEqual({
				top_prop: {
					middle_prop: 123
				},
				also_top: 'a string'
			});
		});
	});
});
