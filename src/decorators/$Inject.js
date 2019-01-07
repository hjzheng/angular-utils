const toString = Object.prototype.toString;

const $Inject = (...dependencies: string[] | Array<string>) => originTarget => {

	// 获取当前 class 的父类
	const parentClass = Object.getPrototypeOf(originTarget);

	const parentDependencies = parentClass.$inject;

	if (parentDependencies && toString.call(parentDependencies) === '[object Array]') {
		dependencies = [...dependencies, ...parentDependencies];
	}

	originTarget.$inject = dependencies;

	const handler = {
		construct(target, argumentsList) {
			dependencies.forEach((dependence, index) => {
				target.prototype[`_${dependence}`] = argumentsList[index];
			});
			return Reflect.construct(target, argumentsList);
		}
	};

	const newTarget = new Proxy(originTarget.prototype.constructor, handler);

	return newTarget;
};

export default $Inject;
