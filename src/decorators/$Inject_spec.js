import angular from 'angular';
import { $Inject } from './$Inject';

describe('@Inject', () => {

	let $controller;
	let $q;
	let $rootScope;

	beforeEach(angular.mock.inject((_$controller_, _$q_, _$rootScope_) => {
		$controller = _$controller_;
		$q = _$q_;
		$rootScope = _$rootScope_;
	}));


	afterEach(() => {
		$controller = null;
		$q = null;
		$rootScope = null;
	});

	// 由于不支持 PhantomJS 不支持 Proxy 对象, 测试无法进行
	xit('注入服务', () => {

		@$Inject('$rootScope', '$q')
		class AppCtrl {
			constructor() {
			}
		}

		let appCtrl = $controller(AppCtrl, {'$rootScope': $rootScope, '$q': $q});
		expect(appCtrl._$rootScope).toEqual($rootScope);
		expect(appCtrl._$q).toEqual($q);
	});
});
