export default class InterceptorFactory {

	constructor() {
		this.filters = [];
	}

	push(fn) {
		this.filters.push(fn);
		return this;
	}

	getInterceptor() {
		return {
			'response': response => this.filters.reduce((value, fn) => fn(value), response)
		};
	}
}

/**
 import injector from 'angular-es-utils/injector';
 const $log = injector.get('$log');

 export default function dataFilter(response) {
	$log.info('data:', response);
	return response;
 }

 import data from './dataFilter';
 import message from './messageFilter';

 const factory = new InterceptorFactory();
 export default factory.push(data).push(message).getInterceptor();
 * */
