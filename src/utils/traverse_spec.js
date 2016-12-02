import traverse from './traverse';

describe('traverse', () => {

	let router1 = null;
	let router2 = null;

	beforeEach(() => {
		router1 = {
			url: '/example',
			views: {
				'@main': {
					templateUrl: 'mainTplUrl',
					controller: 'ApplyingCtrl',
					controllerAs: 'vm'
				}
			}
		};

		router2 = {
			url: '/setting',
			templateUrl: 'settingUrl',
			controller: 'SettingCtrl',
			controllerAs: 'vm'
		};
	});

	afterEach(() => {
		router1 = router2 = null;
	});

	it('替换 controller 字段', () => {
		traverse(router1, 'controller', 'test');
		expect(router1.views['@main'].controller).toBe('test');
		traverse(router2, 'controller', 'test');
		expect(router2.controller).toBe('test');
	});
});
