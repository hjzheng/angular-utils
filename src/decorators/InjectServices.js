/**
 * 不建议使用 angular-es6-utils @Inject, Inject 使用 类对原有的类进行了包装, 原有类的信息无法获取.
 * 下面的 @InjectServices 是无法注入 $scope,
 * 如果必须注入 $scope, 可以考虑使用 NGInject
 * */
import injector from 'angular-es-utils/injector';

export const InjectServices = (...dependencies) => target => {
	dependencies.forEach(dependency => {
		target.prototype[`_${dependency}`] = injector.get(dependency);
	});
};
