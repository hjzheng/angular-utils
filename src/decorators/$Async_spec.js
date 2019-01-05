import {$Async} from './$Async';
import 'babel-polyfill';

function delay(t, v) {
	return new Promise(resolve => {
		setTimeout(resolve.bind(null, v), t);
	});
}

describe('@$Async', () => {

	it('use @$Async', (done) => {
		// TODO: 待调研
		class AppCtrl {
			constructor() {
				this.test();
			}

			@$Async
			async test() {
				const result = await delay(1, 100);
				this.number = result;
			}
		}

		const app = new AppCtrl();

		setTimeout(() => {
			expect(app.number).toBe(100);
			done();
		}, 0);
	});
});
