import angular from 'angular';
import 'angular-mocks';

document.documentElement.setAttribute('ng-app', 'AppForTest');
angular.module('AppForTest', []);

const utilsContext = require.context('../src/utils', true, /\.js$/);
utilsContext.keys().forEach(utilsContext);

const decoratorsContext = require.context('../src/decorators', true, /_spec\.js$/);
decoratorsContext.keys().forEach(decoratorsContext);
