class InjectHelper {
	get injector() {
		return this.injectorInstance;
	}
	set injector(injector) {
		this.injectorInstance = injector;
	}
}
const injectHelper = new InjectHelper();
export default injectHelper;
