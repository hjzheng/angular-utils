// require all
const appContext = require.context('../src/utils', true, /_spec\.js$/);
appContext.keys().forEach(appContext);
