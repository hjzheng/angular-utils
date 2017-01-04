/**
 * 关于装饰器模式:
 * http://nickmeldrum.com/blog/decorators-in-javascript-using-monkey-patching-closures-prototypes-proxies-and-middleware
 * */

export default function decoratorFactory(fn, scope) {
	const instance = {
		addDecorators: decorators => {
			decorators.slice().reverse().forEach(decorator => fn = decorator(fn));
			instance[fn.name] = scope ? fn.bind(scope) : fn;
			return instance;
		}
	};

	return instance;
}
