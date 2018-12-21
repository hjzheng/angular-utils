import angular from 'angular';
import injectHelper from '../helper/injectHelper';
const $rootScope = injectHelper.injector.get('$rootScope');

export const $Apply = (target, key, descriptor) => {
	const fn = descriptor.value;

	if (!angular.isFunction(fn)) {
		throw new SyntaxError('Only functions can be @$Apply');
	}

	return {
		...descriptor,
		value(...args) {
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
