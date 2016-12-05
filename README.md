# angular-utils

[![npm version](https://img.shields.io/npm/v/angular-utils.svg?style=flat-square)](https://www.npmjs.com/package/angular-utils)
[![npm downloads](https://img.shields.io/npm/dt/angular-utils.svg?style=flat-square)](https://www.npmjs.com/package/angular-utils)

### 使用 装饰器

- @Router

@Router 只记录路由配置, 并未进行路由配置. 因此使用 decoratedModule 中的 routerAll 方法配置路由

```js
import { Router } from 'angular-utils/decorators';

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

```js
import { $Inject } from 'angular-utils/utils';

@$Inject('$q', '$scope')
class AppCtrl {
	constructor() {
		// 使用注入对象
		this._$q;
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
