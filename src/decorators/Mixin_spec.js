import { Mixin } from './Mixin';

describe('@Mixin', () => {

	let obj = null;

	beforeEach(() => {
		obj = {
			property: 1,
			method() {}
		};
	});

	afterEach(() => {
		obj = null;
	});

	it('配置路由', () => {

		@Mixin(obj)
		class AppCtrl {
			constructor() {
			}
		}

		let appCtrl = new AppCtrl();
		expect(appCtrl.property).toBe(1);
		expect(appCtrl.method).toEqual(obj.method);
	});

	it('参数', () => {

		@Mixin(obj)
		class AppCtrl {
			constructor() {
			}
		}

		let appCtrl = new AppCtrl();
		expect(appCtrl.property).toBe(1);
		expect(appCtrl.method).toEqual(obj.method);
	});
});
