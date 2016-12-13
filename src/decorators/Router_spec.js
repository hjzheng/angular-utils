import { Router } from './Router';
import map from '../utils/map';

describe('@Router', () => {

	it('配置路由', () => {

		@Router('app', {
			url: '/app',
			templateUrl: 'mockTemplateUrl',
			controller: 'AppCtrl',
			controllerAs: 'vm'
		})
		class AppCtrl {
			constructor() {
			}
		}

		const routerConfig = map.get('uiRoutersConf');
		expect(routerConfig[AppCtrl.name].state).toBe('app');
		expect(routerConfig[AppCtrl.name].config.controller).toEqual(AppCtrl);
	});

	it('多视图路由配置', () => {

		class TicketList {
		}

		class TicketDetail {
		}

		let routerConf = {
			url: '/ticket',
			views: {
				'': {
					templateUrl: './src/app/ticket/ticket.html',
					controller: 'TicketController',
					controllerAs: 'vm'
				},
				'list@ticket': {
					templateUrl: './src/app/ticket/list/list.html',
					controller: TicketList,
					controllerAs: 'vm'
				},
				'detail@ticket': {
					templateUrl: './src/app/ticket/detail/detail.html',
					controller: TicketDetail,
					controllerAs: 'vm'
				}
			}
		};

		@Router('ticket', routerConf)
		class TicketController {
			constructor() {
			}
		}

		const routerConfig = map.get('uiRoutersConf');
		expect(routerConfig[TicketController.name].state).toBe('ticket');
		expect(routerConfig[TicketController.name].config.views[''].controller).toEqual(TicketController);
		expect(routerConfig[TicketController.name].config.views['list@ticket'].controller).toEqual(TicketList);
		expect(routerConfig[TicketController.name].config.views['detail@ticket'].controller).toEqual(TicketDetail);
	});
});
