# angular-utils

[![Build Status](https://img.shields.io/travis/hjzheng/angular-utils.svg?style=flat-square)](https://travis-ci.org/hjzheng/angular-utils)
[![npm version](https://img.shields.io/npm/v/angular-utils.svg?style=flat-square)](https://www.npmjs.com/package/angular-utils)
[![npm downloads](https://img.shields.io/npm/dt/angular-utils.svg?style=flat-square)](https://www.npmjs.com/package/angular-utils)
[![coverage](https://img.shields.io/codecov/c/github/hjzheng/angular-utils.svg?style=flat-square)](https://codecov.io/gh/hjzheng/angular-utils)


### 使用 装饰器 

关于[AngularJS与装饰器](https://github.com/ShuyunXIANFESchool/FE-problem-collection/issues/36)

- @Router

@Router 只记录路由配置(注意这里指的是 UI-Router), 并未进行路由配置. 因此使用 decoratedModule 中的 routerAll 方法配置路由

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
import { $Timeout } from 'angular-utils/utils';

class AppCtrl {
	@$Timeout(0, false)
	test() {
	
	}
}
```

- @$Apply

```js
import { $Apply } from 'angular-utils/utils';

class AppCtrl {
	@$Apply()
	test() {
	
	}
}
```

- @$Inject

依赖注入

```js
import { $Inject } from 'angular-utils/utils';

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
