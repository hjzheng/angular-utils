import angular from 'angular';

function deepTraverse(json, target, value = false) {
	if (angular.isObject(json)) {
		for (const key in json) {
			if (json.hasOwnProperty(key) === true) {
				if (key === target) {
					value ? json[key] = value : value = json[key];
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

export default function traverse(json, target, value) {
	deepTraverse(json, target, value);
}
