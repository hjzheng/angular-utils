function spread(promise = Promise) {

	if (promise.prototype.spread) return;

	promise.prototype.spread = function (fn) {
		return this.then(args => {
			return fn.apply(this, args);
		});
	};
}

export default spread;
