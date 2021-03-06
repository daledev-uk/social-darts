import {api} from './baseApiClient';

const API_SERVER_URL = process.env.VUE_APP_API_HOST ? process.env.VUE_APP_API_HOST : 'http://localhost:5000';

class LoginApi {
	public loginCallback(code: string): Promise<any> {
		return api.send('GET', `${API_SERVER_URL}/login/callback?code=${code}`);
	}
}

export const loginApi = new LoginApi();
