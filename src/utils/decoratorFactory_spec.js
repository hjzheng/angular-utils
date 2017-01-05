import decoratorFactory from './decoratorFactory';

describe('decoratorFactory', () => {

	let decorator1 = null;
	let decorator2 = null;
	let fn = null;
	let obj = null;
	let num = 0;

	beforeEach(() => {
		decorator1 = response => { num++; return response; };
		decorator2 = response => { num++; return response; };
		fn = response => response;

		obj = {
			fn() {
				return this.value;
			},
			value: 10
		};
	});

	afterEach(() => {
		decorator1 = null;
		decorator2 = null;
		num = 0;
		fn = null;
	});

	it('decorate isolate function', () => {
		let d = decoratorFactory(fn);
		d.addDecorators([decorator1, decorator2]);
		expect(d.fn('message')).toBe('message');
		expect(num).toBe(2);
	});

	it('decorate object member method', () => {
		let d = decoratorFactory(obj.fn, obj);
		d.addDecorators([decorator1, decorator2]);
		expect(d.fn()).toBe(10);
		expect(num).toBe(2);
	});

});
