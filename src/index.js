import moduleName from './module';
export default moduleName;

// TODO: 为了兼容 0.1.x 的写法, 正常应该要求用户按需引入, 0.3.x 会删除下面代码
export * from './decorators';
export * from './utils';
