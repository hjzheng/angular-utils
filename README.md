# angular-utils

[![Build Status](https://img.shields.io/travis/hjzheng/angular-utils.svg?style=flat-square)](https://travis-ci.org/hjzheng/angular-utils)
[![npm version](https://img.shields.io/npm/v/angular-utils.svg?style=flat-square)](https://www.npmjs.com/package/angular-utils)
[![npm downloads](https://img.shields.io/npm/dt/angular-utils.svg?style=flat-square)](https://www.npmjs.com/package/angular-utils)
[![coverage](https://img.shields.io/codecov/c/github/hjzheng/angular-utils.svg?style=flat-square)](https://codecov.io/gh/hjzheng/angular-utils)

> ### 注意: 0.2.x 版本的使用方式与之前 0.1.x 的使用方式有所不同

```js
// 需要在 AngularJS 启动时候引入 ngUtils 模块
import ngUtils from 'angular-utils';
angular.module('app', [ngUtils]); 
```

### 使用 装饰器 

关于[AngularJS与装饰器](https://github.com/ShuyunXIANFESchool/FE-problem-collection/issues/36)

- @Router

@Router 只记录路由配置(注意这里指的是 UI-Router ^0.2.18), 并未进行路由配置. 因此使用 decoratedModule 中的 routerAll 方法配置路由

> 注意: 
> 如果使用 Uglify 压缩代码, 请禁用 mangle `{ mangle: false }`
> 如果使用 UglifyJS2 压缩代码, 请保持函数名称 `mangle: { keep_fnames: true }`

```js
import { Router } from 'angular-utils/decorators';
import { decoratedModule } from 'angular-utils/utils';
import ExampleTplUrl from './example.tpl.html';

@Router('example', {
    url: '/example',
    templateUrl: ExampleTplUrl,
    controller: 'ExampleCtrl',
    controllerAs: 'vm'
})
export default class ExampleCtrl {
    constructor() {
       this.init();
    }

    init() {
    }
}

// app.js
import { decoratedModule } from 'angular-utils/utils';
import AppCtrl from './AppCtrl';

export default decoratedModule('App', [])
.routerAll()
.controller(`AppCtrl`, AppCtrl)
.name;

```

注意: 关于 UI-Router 多命名视图配置

```js
class TicketList {
}

class TicketDetail {
}

let routerConf = {
	url: '/ticket',
	views: {
		'': {
			templateUrl: './src/app/ticket/ticket.html',
			controller: 'TicketController',
			controllerAs: 'vm'
		},
		'list@ticket': {
			templateUrl: './src/app/ticket/list/list.html',
			controller: TicketList,
			controllerAs: 'vm'
		},
		'detail@ticket': {
			templateUrl: './src/app/ticket/detail/detail.html',
			controller: TicketDetail,
			controllerAs: 'vm'
		}
	}
};

@Router('ticket', routerConf)
class TicketController {
	constructor() {
	}
}
```

- @$Timeout

```js
import { $Timeout } from 'angular-utils/decorators';

class AppCtrl {
	@$Timeout(0, false)
	test() {
	
	}
}
```

- @$Apply

```js
import { $Apply } from 'angular-utils/decorators';

class AppCtrl {
	@$Apply()
	test() {
	
	}
}
```

- @$Async

```js
import { $Async } from 'angular-utils/decorators';

class AppCtrl {
	@$Async()
	async test() {
		const result = await fetchSomeInfos();
		this.info = result.info;
	}
}
```

- @$Inject

依赖注入

```js
import { $Inject } from 'angular-utils/decorators';

@$Inject('$q', '$scope')
class AppCtrl {
	constructor() {
		// 使用注入对象
		this._$q;
		this._$scope;
	}
}
```

依赖注入与继承

```js
@$Inject('$rootScope')
class SuperCtrl {
	constructor() {
	}
}

@$Inject('$q')
class AppCtrl extends SuperCtrl {
	constructor() {
		super();
	}
	
	test() {
		// 使用注入对象
		this._$q;
		this._$rootScope;
	}
}


```

- @Mixin

```js
import { Mixin } from 'angular-utils/decorators';

const obj = {
   myMethod(){
   }
}

@Mixin(obj)
class MainCtrl {
    constructor() {
        this.myMethod();
    }
}
```

- @InjectServices
注意 InjectService 无法注入 $scope, 因为 $scope 不是 service

```js
import { InjectServices } from 'angular-utils/decorators';

@InjectServices('$state', '$log', '$stateParams', '$filter')
export default class PartialPage {
	constructor(title) {
		this.title = title;
	}
	
	init() {
		// 使用注入的服务
		this._$state.go(/*...*/);
	}
}
```

## 使用 utils

- InterceptorFactory

由于 $resource 的 interceptor 配置, 不支持数组方式, 配置多拦截器.
InterceptorFactory 可以实现多拦截器的效果, 例子请参考: InterceptorFactory_spec.js

```js
import { InterceptorFactory } from 'angular-utils/utils';
```

- spread

为 Promise 提供 spread 方法

```js
import { spread } from 'angular-utils/utils';

spread();
Promise.resolve([1, 2, 3]).spread((a, b, c) => {
	expect(a).toBe(1);
	expect(b).toBe(2);
	expect(c).toBe(3);
});
```

当然你也可以扩展 $q 中的 Promise (可以在 run 阶段执行方法)

```js
spread(Object.getPrototypeOf($q.defer().promise).constructor);
```

- decoratedModule

包装 angular 模块方法, 不对外提供 filter/service, 原因见[No Service/Filter](https://github.com/ShuyunFF2E/ccms-angular-styleguide#no-servicefilter-)

另外 decoratedModule 提供了 `namespace` 方法, 用于启用 namespace, 这时候无论是声明 controller, directive 还是 component 时候, 都会自动添加 moduleName 前缀
避免重名问题.

```js
import { decoratedModule } from 'angular-utils/utils';
```

- EventBus 

用于取代 angular 原生的 $on $broadcast $emit 原因见[ng中的事件订阅与发布](https://github.com/ShuyunXIANFESchool/FE-problem-collection/issues/20)

```js
import { EventBus } from 'angular-utils/utils';

// 添加事件
EventBus.addEvent('customEvent');
EventBus.addEvent('customEvent2');

// 订阅事件
let listener = function () {
	// do something that you like
};

EventBus.events.customEvent.sub(listener);

EventBus.events.customEvent.sub((obj) => {
	expect(obj.test).toBe('test');
});

// 发布事件
EventBus.events.customEvent.pub({test: 'test'});

// 禁用事件
EventBus.events.customEvent.disable = true;

// 事件禁用后, 无法触发该类事件
EventBus.events.customEvent.pub({test: 'test'});

// 启用事件
EventBus.events.customEvent.disable = false;

// 删除注册的 listener 函数
EventBus.events.customEvent.clear(listener);

// 删除所有 customEvent 事件的监听函数
EventBus.events.customEvent.clear();

// 删除事件
EventBus.clear('customEvent');

// 删除所有添加的事件
EventBus.clear();

```

## `@Component`和`@Route`的使用说明

### @Route
> 将angular注册路由的代码用装饰器统一执行

+ 下面有一段原生的路由配置：

```javascript

// index.js 文件中设置路由
import angular from 'angular';
import controller from './controller';
import templateUrl from './template.html';

routerConfig.$inject = ['$stateProvider'];
function routerConfig($stateProvider) {
	$stateProvider
		.state('le.member.information', {
			url: '/le/member',
			templateUrl,
			controller,
			controllerAs: '$ctrl'
		});
	}

export default angular.module('ccms.le.member', []) // 添加子模块
			.config(routerConfig)
			.name;

```

+ 使用@Route的方式改造路由注册，直接在对应controller上添加装饰器

@Route支持所有原生路由的参数配置，额外添加了stateName选项用于替代state，添加了modules用于设置子模块，添加了moduleName可以自定义路由注册时模块的名称

```javascript
import templateUrl from './templateUrl';
import Route, {routerHub, setModulePrefix} from './decorators/Router';

// 注册路由时，moduleName会默认使用prefix+stateName, 也可以使用moduleName选项自定义设置模块名称
// setRouterPrefx('ccms');

@Route({
	stateName: 'le.member.information',
	templateUrl,
	url: '/le/member',
	modules: []
})
export default class MemberInformation {

}

```

+ 还提供了routerHub和withRouter。routerHub提供类似vue-router的集中处理路由的方式。

```javascript
import { routerHub } from './decorators/Route'

export default routerHub({
	stateName: 'le.card',
	url: '/card',
	template: '<ui-view></ui-view>',
	children: [{
		stateName: 'le.card.create',
		url: '/create/:planId',
		controller: createCtrl,
		templateUrl: createTpl
	}, {
		stateName: 'le.card.list',
		url: '/list',
		controller: listCtrl,
		templateUrl: listTpl
	}]
});

```


### @Component

> 与@Route的涉及的思路一致，均使用装饰器的方式整合注册过程。
> @Component整合了组件注册的代码

+ 下面一段代码使用原生的方式注册组件
```javascript

// index.js
import angular from 'angular';

import templateUrl from '../base/template.html';
import controller from './controller';

const componentOpts = {
  controller,
  templateUrl,
  bindings: {
    vAlign: '@?', // 垂直对齐
    hAlign: '@?', // 水平对齐
    styleObj: '<?', // 自定义样式
    className: '@', // 自定义类
    gap: '<?' // 内间距
  },
  transclude: true
};

export default angular
  .module('ccms.components.VGroup', [])
  .component('vGroup', componentOpts)
  .name;

```

+ 对应的，使用@Component的方式注册组件

```javascript

import GroupBase from '../base/base-controller';
import {Inject} from 'angular-es-utils';
import Component from '../../../sdk/utils/easy-component';
import templateUrl from '../base/template.html';

@Component({
  name: 'vGroup',
	templateUrl: templateUrl,
	bindings: {
		vAlign: '@?', // 垂直对齐
		hAlign: '@?', // 水平对齐
		styleObj: '<?', // 自定义样式
		className: '@', // 自定义类
		gap: '<?' // 内间距
	},
 transclude: true
})
@Inject('$transclude', '$element', '$compile', '$scope')
export default class VGroup extends GroupBase {
	constructor(){
		super();
	}
}
```

除了添加额外的name选项用于设置组件名称，支持原生注册组件的所有选项，组件名称使用驼峰形式，否则无法渲染。
