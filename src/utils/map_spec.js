import map from './map';

describe('map', () => {

	it('set and get', () => {
		map.set('path', '/root/hjzheng');
		expect(map.get('path')).toBe('/root/hjzheng');
		map.clear();
	});

});
