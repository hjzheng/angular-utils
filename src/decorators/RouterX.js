/**
 * Created by hankang on 2018/9/12
 */

/**
 * 模块涉及的功能：
 * 1. 输出模块，构建组件树。
 * 2. 通过装饰器的形式，简化路由配置
 * 3. 类react/vue，集中处理各个模块路由
 */

import angular from 'angular';

let prefix = 'ccms';
/**
 *  路由装饰器
 * @param config config的配置选项包括{ stateName, children/module, url, templateUrl, template, controller, controllerAs, ... } 
 * @returns {Function}
 * @constructor
 */
function RouterX(config) {
	return function(target) {
		config.controller = target; // 强制改变路由配置中的controller为当前修饰的控制器
		withRouter(config); // 设置路由
	};
}

/**
 * 路由配置函数
 * @param config // stateName: 路由状态名称; modules: 子模块; moduleName: 当前路由注册的模块名称;
 * @returns {*}
 */
function withRouter(config) {
	const { stateName, modules = [], moduleName, ...routerConfig } = config;

	if (!stateName) {
		throw new Error('请设置有效的stateName');
	}

	// 路由配置
	routerConfig.controllerAs = routerConfig.controllerAs || '$ctrl';
	router.$inject = ['$stateProvider'];
	function router($stateProvider) {
		$stateProvider
				.state(stateName, routerConfig);
	}

	// 输出模块配置
	return angular
			.module(moduleName || `${prefix}.${stateName}`, [...modules])
			.config(router)
			.name;

}

/**
 * 类似于react和vue，集中处理路由信息， 此处的children表示子模块的配置，而不是子模块本身, children代替了modules的作用
 * @param configTree 传入值是多重嵌套结构{ stateName, url, templateUrl, children: [{stateName, url, templateUrl, children: []}, { stateName, url, children: [] }] }
 */
function routerHub(configTree) {
	// 废除modules的作用
	delete configTree.modules;
	// 处理路由
	withRouter(configTree);
	const children = configTree.children;
	// 递归处理子模块路由
	if (Array.isArray(children) && children.length > 0) {
		for (let i = 0; i < children.length; i++) {
			routerHub(children[i]);
		}
	}
}


// 设置模块名称前缀
function setModulePrefix(_prefix) {
	prefix = _prefix;
}

function getModulePrefix() {
	return prefix;
}


export default RouterX;
export {
	withRouter,
	routerHub,
	setModulePrefix,
	getModulePrefix
};
