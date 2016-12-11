import map from './map';

describe('map', () => {

	it('set and get', () => {
		map.set('path', '/root/hjzheng');
		expect(map.get('path')).toBe('/root/hjzheng');
		map.clear();
	});

	it('arguments type test', () => {
		try {
			map.set(111, '/root/hjzheng');
		} catch (e) {
			expect(e.message).toMatch(/Value of argument "key" violates/);
		}

		try {
			map.get(123);
		} catch (e) {
			expect(e.message).toMatch(/Value of argument "key" violates/);
		}
	});

});
