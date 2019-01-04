import angular from 'angular';
import map from './map';

class DecoratedModule {
	constructor(name: string, modules: ?Array) {
		this.routers = map.get('uiRoutersConf') || {};
		this.name = name;
		this._namespace = '';

		if (modules) {
			this.ngModule = angular.module(name, modules);
		} else {
			this.ngModule = angular.module(name);
		}
	}

	namespace(_namespace: ?string) {
		this._namespace = _namespace || this.name;
	}

	assembleNamespace(name) {
		return `${this._namespace}.${name}`;
	}

	router(className: ?string) {
		const routers = this.routers;
		configRouter.$inject = ['$stateProvider'];
		function configRouter($stateProvider) {
			if (className) {
				$stateProvider.state(routers[className].state, routers[className].config);
			} else {
				Object.keys(routers).forEach(key => {
					$stateProvider.state(routers[key].state, routers[key].config);
				});
			}
		}
		this.ngModule.config(configRouter);
		return this;
	}

	routerAll() {
		return this.router();
	}

	config(configFunc) {
		this.ngModule.config(configFunc);
		return this;
	}

	run(runFunc) {
		this.ngModule.run(runFunc);
		return this;
	}

	controller(...params) {
		const ctrlName = params.shift();
		params.unshift(this.assembleNamespace(ctrlName));
		this.ngModule.controller(...params);
		return this;
	}

	directive(...params) {
		const directiveName = params.shift();
		params.unshift(this.assembleNamespace(directiveName));
		this.ngModule.directive(...params);
		return this;
	}

	component(...params) {
		const directiveName = params.shift();
		params.unshift(this.assembleNamespace(directiveName));
		this.ngModule.component(...params);
		return this;
	}

}

function Module(...params) {
	const module = new DecoratedModule(...params);
	return module;
}

export default Module;
