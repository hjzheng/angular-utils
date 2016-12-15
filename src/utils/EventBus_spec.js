import EventBus from './EventBus';

describe('EventBus', () => {

	let test1Listener = null;
	let test2Listener = null;
	let test3Listener = null;

	beforeEach(() => {
		EventBus.addEvent('test1');
		EventBus.addEvent('test2');
		EventBus.addEvent('test3');

		test1Listener = jasmine.createSpy('test1Listener');
		test2Listener = jasmine.createSpy('test2Listener');
		test3Listener = jasmine.createSpy('test3Listener');
	});

	afterEach(() => {
		test1Listener = null;
		test2Listener = null;
		test3Listener = null;
		EventBus.clear();
	});

	it('注册事件监听器', () => {
		EventBus.events.test1.sub(test1Listener);

		expect(test1Listener).not.toHaveBeenCalled();

		EventBus.events.test1.pub('test1');
		EventBus.events.test1.pub('test2');

		expect(test1Listener).toHaveBeenCalled();
		expect(test1Listener).toHaveBeenCalledWith('test1');
		expect(test1Listener).toHaveBeenCalledTimes(2);
	});

	it('注册多个事件监听器', () => {
		EventBus.events.test1.sub(test1Listener);
		EventBus.events.test1.sub(test2Listener);
		EventBus.events.test1.sub(test3Listener);

		EventBus.events.test1.pub('test');

		expect(test1Listener).toHaveBeenCalledWith('test');
		expect(test2Listener).toHaveBeenCalledWith('test');
		expect(test3Listener).toHaveBeenCalledWith('test');
	});

	it('清除事件监听器', () => {
		EventBus.events.test1.sub(test1Listener);
		EventBus.events.test1.sub(test2Listener);
		EventBus.events.test1.sub(test3Listener);

		EventBus.events.test1.clear(test2Listener);

		EventBus.events.test1.pub('test');

		expect(test1Listener).toHaveBeenCalledWith('test');
		expect(test2Listener).not.toHaveBeenCalledWith('test');
		expect(test3Listener).toHaveBeenCalledWith('test');
	});

	it('清除所有事件监听器', () => {
		EventBus.events.test1.sub(test1Listener);
		EventBus.events.test1.sub(test2Listener);
		EventBus.events.test1.sub(test3Listener);

		EventBus.events.test1.clear();

		EventBus.events.test1.pub('test');

		expect(test1Listener).not.toHaveBeenCalled();
		expect(test2Listener).not.toHaveBeenCalled();
		expect(test3Listener).not.toHaveBeenCalled();
	});

	it('对不同事件注册监听器', () => {
		EventBus.events.test1.sub(test1Listener);
		EventBus.events.test2.sub(test2Listener);
		EventBus.events.test3.sub(test3Listener);

		EventBus.events.test1.pub('test');
		EventBus.events.test3.pub('test');

		expect(test1Listener).toHaveBeenCalledWith('test');
		expect(test2Listener).not.toHaveBeenCalled();
		expect(test3Listener).toHaveBeenCalledWith('test');
	});

	it('对不同事件注册监听器', () => {
		EventBus.events.test1.sub(test1Listener);
		EventBus.events.test2.sub(test2Listener);
		EventBus.events.test3.sub(test3Listener);

		EventBus.events.test1.pub('test');
		EventBus.events.test3.pub('test');

		expect(test1Listener).toHaveBeenCalledWith('test');
		expect(test2Listener).not.toHaveBeenCalled();
		expect(test3Listener).toHaveBeenCalledWith('test');
	});

	it('禁用事件和启用事件', () => {
		EventBus.events.test1.sub(test1Listener);
		EventBus.events.test2.sub(test2Listener);

		EventBus.events.test1.disable = true;
		EventBus.events.test1.pub('test');
		EventBus.events.test2.pub('test');

		expect(test1Listener).not.toHaveBeenCalledWith('test');
		expect(test2Listener).toHaveBeenCalledWith('test');

		EventBus.events.test1.disable = false;
		EventBus.events.test1.pub('test');
		expect(test1Listener).toHaveBeenCalledWith('test');
	});

	it('在一个 Listener 中清除自身 Listener', () => {

		let listener = function () {
			EventBus.events.test1.clear(listener);
		};

		EventBus.events.test1.sub(listener);
		EventBus.events.test1.sub(test1Listener);

		EventBus.events.test1.pub('test');

		expect(test1Listener).toHaveBeenCalledWith('test');
	});

	it('在一个 Listener 中清除其他 Listener', () => {


		let listener = function () {
			EventBus.events.test1.clear(test1Listener);
			EventBus.events.test1.clear(test2Listener);
		};

		EventBus.events.test1.sub(test1Listener);
		EventBus.events.test1.sub(listener);
		EventBus.events.test1.sub(test2Listener);
		EventBus.events.test1.sub(test3Listener);

		EventBus.events.test1.pub('test');

		expect(test1Listener).toHaveBeenCalledWith('test');
		expect(test2Listener).not.toHaveBeenCalledWith('test');
		expect(test3Listener).toHaveBeenCalledWith('test');

		EventBus.events.test1.pub('test');

		expect(test1Listener).toHaveBeenCalledTimes(1);
		expect(test2Listener).toHaveBeenCalledTimes(0);
		expect(test3Listener).toHaveBeenCalledTimes(2);

	});

});
