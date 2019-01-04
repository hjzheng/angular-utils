/*
 * Created on Wed Oct 17 2018
 *
 * Copyright (c) 2018 Your Company
 */

import angular from 'angular';


let prefix = null;
/**
 * 全局注册组件
 * @param {*} config { name, ...componentOpts }
 */
function withComponent(config) {
	const { name, ...componentOpts } = config;

    // 验证name的值为驼峰形式, 连字符的形式命名会引发无法渲染的问题
	if (!(/^[a-z|A-Z]+$/.test(name))) {
		console.warn('组件名称不符合驼峰形式，可能引起渲染异常！');
	}

	return angular.module(prefix || `__components__.${name}`, []).component(name, componentOpts);
}


// 设置模块名称前缀
function setModulePrefix(_prefix) {
	prefix = _prefix;
}

function getMoudlePrefix() {
	return prefix;
}

export default function Component(config) {
	return target => {
		config.controller = target;
		withComponent(config);
	};
}

export {
  setModulePrefix,
  getMoudlePrefix
};
