import traverse from './traverse';

describe('traverse', () => {

	let router1 = null;
	let router2 = null;
	let router3 = null;

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

		router3 = {
			url: '/ticket',
			views: {
				'': {
					templateUrl: './src/app/ticket/ticket.html',
					controller: 'TicketController',
					controllerAs: 'vm'
				},
				'list@ticket': {
					templateUrl: './src/app/ticket/list/list.html',
					controller: function () {
						// this is a TicketListController
					},
					controllerAs: 'vm'
				},
				'detail@ticket': {
					templateUrl: './src/app/ticket/detail/detail.html',
					controller: function () {
						// this is a TicketDetailController
					},
					controllerAs: 'vm'
				}
			}
		};
	});

	afterEach(() => {
		router1 = router2 = router3 = null;
	});

	it('替换 controller 字段', () => {
		traverse(router1, 'controller', 'test');
		expect(router1.views['@main'].controller).toBe('test');
		traverse(router2, 'controller', 'test');
		expect(router2.controller).toBe('test');
	});

	it('如果 controller 字段不是 function 时, 才会发生替换', () => {
		traverse(router3, 'controller', 'test');
		expect(router3.views[''].controller).toBe('test');
		expect(router3.views['detail@ticket'].controller).not.toBe('test');
		expect(router3.views['list@ticket'].controller).not.toBe('test');
	});
});
