import InterceptorFactory from './InterceptorFactory';

describe('InterceptorFactory', () => {

	let factory = null;
	let filter1 = null;
	let filter2 = null;
	let num = 0;

	beforeEach(() => {
		factory = new InterceptorFactory();
		filter1 = response => { num++; return response.data; };
		filter2 = response => { num++; return response; };
	});

	afterEach(() => {
		factory = null;
		filter1 = null;
		filter2 = null;
		num = 0;
	});

	it('getInterceptor', () => {
		expect(factory.push(filter2).push(filter1).getInterceptor().response({data: 'message'})).toBe('message');
		expect(num).toBe(2);
	});

});
