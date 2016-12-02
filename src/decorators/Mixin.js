const { defineProperty, getOwnPropertyNames, getOwnPropertyDescriptor } = Object;

function getOwnPropertyDescriptors(obj) {
	const descs = {};

	getOwnPropertyNames(obj).forEach(key => {
		descs[key] = getOwnPropertyDescriptor(obj, key);
	});

	return descs;
}


export const Mixin = (...mixins) => target => {

	if (!mixins.length) {
		throw new SyntaxError(`@mixin() class ${target.name} 至少需要一个参数.`);
	}

	for (let i = 0; i < mixins.length; i++) {
		const descs = getOwnPropertyDescriptors(mixins[i]);
		const keys = getOwnPropertyNames(descs);

		for (let j = 0, k = keys.length; j < k; j++) {
			const key = keys[j];

			if (!(key in target.prototype)) {
				defineProperty(target.prototype, key, descs[key]);
			}
		}
	}
};
