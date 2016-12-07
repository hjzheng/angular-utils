// import angular from 'angular';

describe('@InjectServices', () => {

	let InjectServices;

	// angular-es-utils/injector 获取 injector 有 bug, 必须 AngularJS 初始化完成, 才可以得到
	// 因为 Angular 启动完, 会做一次脏检查, 所以使用 setTimeout 引入 InjectServices, 加入到 event loop 里
	beforeEach(done => {
		setTimeout(() => {
			InjectServices = require('./InjectServices').InjectServices;
			done();
		});
	});

	it('注入服务', () => {

		@InjectServices('$rootScope', '$q')
		class AppCtrl {
			constructor() {
			}
		}
		expect(AppCtrl.prototype._$rootScope.$new).toBeDefined();
		expect(AppCtrl.prototype._$q.all).toBeDefined();
	});
});
