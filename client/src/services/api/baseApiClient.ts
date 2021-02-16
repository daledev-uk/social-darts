import axios from 'axios';
import urljoin from 'url-join';

class BaseApiClient {
	private baseUrl = process.env.VUE_APP_API_HOST as string;

	public async send<T>(method: string, url: string, data: object = {}, headers: object = {}): Promise<T> {
		const urlToCall = url.startsWith('http') ? url : urljoin(this.baseUrl, url);
		const response = await axios(urlToCall, { method, data, headers })
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
		return {} as T;
	}
}

export const api = new BaseApiClient();
