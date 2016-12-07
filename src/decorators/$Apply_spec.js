describe('@$Apply', () => {
	// angular-es-utils/injector 获取 injector 有 bug, 必须 AngularJS 初始化完成, 才可以得到
	// 因为 Angular 启动完, 会做一次脏检查, 所以使用 setTimeout 引入, 加入到 event loop 里
	beforeEach(done => {
		setTimeout(() => {
			require('./$Apply').$Apply;
			done();
		});
	});
});
