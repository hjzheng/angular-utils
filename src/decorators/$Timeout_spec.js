describe('@$Timeout', () => {
	let $Timeout = null;
	// angular-es-utils/injector 获取 injector 有 bug, 必须 AngularJS 初始化完成, 才可以得到 -> 已经修正删除了 angular-es-utils/injector
	// 因为 Angular 启动完, 会做一次脏检查, 所以使用 setTimeout 引入, 加入到 event loop 里
	beforeEach(done => {
		setTimeout(() => {
			$Timeout = require('./$Timeout').default;
			done();
		});
	});

	afterEach(() => {
		$Timeout = null;
	});

	it('use @$Timeout', () => {
		class AppCtrl {
			constructor() {
				this.count = 0;
			}
			@$Timeout()
			test() {
				this.count = 10;
			}
		}

		let appCtrl = new AppCtrl();
		let promise = appCtrl.test();
		expect(appCtrl.count).toBe(0);
		promise.then(() => {
			expect(appCtrl.count).toBe(10);
		});
	});
});
