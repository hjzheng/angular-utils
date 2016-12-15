class Event {
	constructor(name: string) {
		this.name = name;
		this.subscribers = [];
		this.disable = false;
	}

	// 订阅事件, 返回清除事件的函数
	sub(fn) {
		var _this = this;
		_this.subscribers.push(fn);
		// return function () {
		// 	_this.clear(fn);
		// };
		return this;
	}
	// 发布事件，成功后返回自身
	pub() {
		if (this.disable) return this;
		let args = [].slice.call(arguments);
		let i = 0;
		while (i < this.subscribers.length) {
			if (this.subscribers[i] === null) {
				this.subscribers.splice(i, 1);
			} else {
				this.subscribers[i].apply(null, args);
				i++;
			}
		}
		return this;
	}

	// 清除事件
	clear(fn) {
		if (typeof fn === 'function') {
			let index = this.subscribers.indexOf(fn);
			if (index >= 0) {
				this.subscribers[index] = null;
			}
		} else {
			this.subscribers = [];
		}
		return this;
	}
}

let events = {};

export default {
	events,
	addEvent(name: string) {
		if (!events[name]) {
			events[name] = new Event(name);
		}
	},
	clear(name: ?string) {
		if (typeof fn === 'string') {
			delete events[name];
		} else {
			events = {};
		}
	}
};
