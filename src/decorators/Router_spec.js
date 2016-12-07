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
});
