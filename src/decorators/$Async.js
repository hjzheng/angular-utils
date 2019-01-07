import angular from 'angular';
import injectHelper from '../utils/injectHelper';

const $Async = (target, key, descriptor) => {

	const fn = descriptor.value;

	if (!angular.isFunction(fn)) {
		throw new SyntaxError('Only functions can be @$Async');
	}

	return {
		...descriptor,
		value(...args) {
			const result = fn.apply(this, args);
			injectHelper.injector.invoke(['$rootScope', '$q', ($rootScope, $q) => {
				$q.when(result)
					.then(() => $rootScope.$applyAsync());
			}]);
		}
	};
};

export default $Async;
