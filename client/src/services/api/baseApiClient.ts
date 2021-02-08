import axios from 'axios';
import urljoin from 'url-join';
import config from '@/config/config';

class BaseApiClient {

	public send<T>(method: string, url: string, data: object = {}, headers: object = {}): Promise<T> {
		return config().then((appConfig) => {
			const urlToCall = urljoin(appConfig.apiHost, appConfig.apiVersion, url);
			return axios(urlToCall, {
				method,
				data,
				headers
			}).then(response => {
				if (response.status >= 400) {
					// check for 4XX, 5XX
					return Promise.reject({
						status: response.status,
						message: response.statusText
					});
				}
				if (response.status >= 200 && response.status <= 202) {
					return response.data;
				}
				return {};
			});
		});
	}
}

export const api = new BaseApiClient();
