import 'angular';
import 'angular-mocks';

// require all
const appContext = require.context('../src/utils', true, /\.js$/);
appContext.keys().forEach(appContext);
