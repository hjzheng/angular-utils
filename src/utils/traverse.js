import angular from 'angular';

function deepTraverse(json, target, value = false) {
	if (angular.isObject(json)) {
		for (const key in json) {
			if (json.hasOwnProperty(key) === true) {
				if (key === target) {
					angular.isFunction(json[key]) ? angular.noop() : json[key] = value;
				}
				deepTraverse(json[key], target, value);
			}
		}
	} else if (angular.isArray(json)) {
		for (let i = 0; i < json.length; i++) {
			const jsonObj = json[i];
			deepTraverse(jsonObj, target, value);
		}
	}
}

export default function traverse(json: Object | Array, target: number | string, value: any): void {
	deepTraverse(json, target, value);
}
