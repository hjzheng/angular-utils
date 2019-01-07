describe('@InjectServices', () => {

	let InjectServices;
	beforeEach(done => {
		setTimeout(() => {
			InjectServices = require('./InjectServices').default;
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
