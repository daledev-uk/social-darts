import axios from 'axios';
let appConfig: AppConfig;

const loadPromise = axios(getAppConfigUrl(), {
	method: 'get'
}).then(res => res.data)
.then(config => {
	appConfig = config;
});

function getAppConfigUrl() {
	// the appConfig file is relative to the sdk.js file (the script we're executing)
	// so get the url of the script from the script tag
	let configUrl = '';
	const script = document.getElementById('connect-web-assistant-sdk');

	if (script) {
		const pathArray = (script as HTMLScriptElement).src.split('/');
		const protocol = pathArray[0];
		const host = pathArray[2];
		configUrl = protocol + '//' + host;
	}
	configUrl += '/assets/appConfig.json';

	return configUrl;
}

export interface AppConfig {
	apiHost: string;
	apiVersion: string;
}

export default function() {
	return loadPromise.then(() => {
		return appConfig;
	});
}
