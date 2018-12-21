import angular from 'angular';
import injectHelper from '../helper/injectHelper';
const $timeout = injectHelper.injector.get('$timeout');

export const $Timeout = (delay = 0, invokeApply = true) => (target, key, descriptor) => {
	const fn = descriptor.value;

	if (!angular.isFunction(fn)) {
		throw new SyntaxError('Only functions can be @$Apply');
	}

	return {
		...descriptor,
		value(...args) {
			return $timeout(() => {
				fn.apply(this, args);
			}, delay, invokeApply);
		}
	};
};
