import injectHelper from '../utils/injectHelper';

const InjectServices = (...dependencies: string[] | Array<string>) => target => {
	dependencies.forEach(dependency => {
		target.prototype[`_${dependency}`] = injectHelper.injector.get(dependency);
	});
};

export default InjectServices;
