/**
 * @author hjzheng
 * just a map, 存储一些公共基础信息
 */

let map = {};

const get = (key: string) => map[key];

const set = (key: string, value: any) => {
	map[key] = value;
};

const clear = () => {
	map = {};
};

const result = {
	get,
	set,
	clear
};

export default result;
