import angular from 'angular';
import injectHelper from '../utils/injectHelper';

const $Apply = (target, key, descriptor) => {
	const fn = descriptor.value;

	if (!angular.isFunction(fn)) {
		throw new SyntaxError('Only functions can be @$Apply');
	}

	return {
		...descriptor,
		value(...args) {

			const $rootScope = injectHelper.injector.get('$rootScope');

			if (!$rootScope.$$phase) {
				$rootScope.$digest(() => {
					fn.apply(this, args);
				});
			} else {
				$rootScope.$evalAsync(() => {
					fn.apply(this, args);
				});
			}
		}
	};
};

export default $Apply;
