import angular from 'angular';
import injectHelper from './../utils/injectHelper';

export default angular.module('utils.help', []).run(['$injector', $injector => {
	injectHelper.injector = $injector;
}]).name;
