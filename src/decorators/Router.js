import map from '../utils/map';
import traverse from '../utils/traverse';

export const Router = (state, config) => target => {
	// use target replace controller name
	traverse(config, 'controller', target);

	const routers = map.get('uiRoutersConf') || {};
	const className = target.name;

	routers[className] = {
		state,
		config
	};
	map.set('uiRoutersConf', routers);
};
