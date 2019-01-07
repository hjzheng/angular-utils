import angular from 'angular';
import injectHelper from '../utils/injectHelper';

const $Timeout = (delay = 0, invokeApply = true) => (target, key, descriptor) => {
	const fn = descriptor.value;

	if (!angular.isFunction(fn)) {
		throw new SyntaxError('Only functions can be @$Apply');
	}

	return {
		...descriptor,
		value(...args) {
			const $timeout = injectHelper.injector.get('$timeout');
			return $timeout(() => {
				fn.apply(this, args);
			}, delay, invokeApply);
		}
	};
};

export default $Timeout;
