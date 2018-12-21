import angular from 'angular';
import 'angular-mocks';
import moduleName from '../src/index';

document.documentElement.setAttribute('ng-app', 'AppForTest');
angular.module('AppForTest', [moduleName]);

const utilsContext = require.context('../src/utils', true, /\.js$/);
utilsContext.keys().forEach(utilsContext);

const decoratorsContext = require.context('../src/decorators', true, /_spec\.js$/);
decoratorsContext.keys().forEach(decoratorsContext);
