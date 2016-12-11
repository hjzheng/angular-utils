import spread from './spread';
import angular from 'angular';

describe('spread', () => {

	let $rootScope;
	let $q;

	beforeEach(angular.mock.inject((_$rootScope_, _$q_) => {
		$q = _$q_;
		$rootScope = _$rootScope_;
	}));

	afterEach(() => {
		$q = null;
		$rootScope = null;
	});

	// PhantomJS 不支持 Promise 对象, Chrome 下测试 OK
	it('扩展原生的 promise 对象', () => {
		spread();
		expect(Promise.prototype.spread).toBeDefined();
		Promise.resolve([1, 2, 3]).spread((a, b, c) => {
			expect(a).toBe(1);
			expect(b).toBe(2);
			expect(c).toBe(3);
		});
	});

	// PhantomJS 不支持 Promise 对象, Chrome 下测试 OK
	it('扩展 $q 中的 promise 对象', () => {
		spread(Object.getPrototypeOf($q.defer().promise).constructor);

		function testQ() {
			var deferred = $q.defer();
			deferred.resolve([1, 2, 3]);
			return deferred.promise;
		}

		testQ().spread((a, b, c) => {
			expect(a).toBe(1);
			expect(b).toBe(2);
			expect(c).toBe(3);
		});

		// Propagate promise resolution to 'then' functions using $apply().
		$rootScope.$apply();
	});

});
