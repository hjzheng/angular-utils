import injectHelper from '../helper/injectHelper';

export const InjectServices = (...dependencies: string[] | Array<string>) => target => {
	dependencies.forEach(dependency => {
		target.prototype[`_${dependency}`] = injectHelper.injector.get(dependency);
	});
};
