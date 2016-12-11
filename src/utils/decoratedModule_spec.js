import angular from 'angular';
import decoratedModule from './decoratedModule';

describe('decoratedModule', () => {

	let $controller;
	let module;
	let configFunc;
	let runFunc;

	beforeEach(() => {
		configFunc = jasmine.createSpy('configFunc');
		runFunc = jasmine.createSpy('runFunc');
		module = decoratedModule('AnotherApp', []);
		module.config(configFunc);
		module.run(runFunc);
		module.controller('AnotherAppCtrl', function ($scope) {
			$scope.name = 'test';
		});
	});

	beforeEach(angular.mock.module('AnotherApp'));

	beforeEach(angular.mock.inject((_$controller_) => {
		$controller = _$controller_;
	}));

	afterEach(() => {
		$controller = module = configFunc = runFunc = null;
	});

	it('create module and get module', () => {
		expect(module.name).toBe('AnotherApp');
	});

	it('test controller', () => {
		let $scope: Object = {};
		$controller('AnotherAppCtrl', { $scope: $scope });
		expect($scope.name).toBe('test');
	});

	it('test config', () => {
		expect(configFunc.calls.count()).toEqual(1);
	});

	it('test run', () => {
		expect(runFunc.calls.count()).toEqual(1);
	});

});
