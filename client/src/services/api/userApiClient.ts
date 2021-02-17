import {api} from './baseApiClient';
import {RegisterLoggedOnUserResponse} from '../../../../server/src/viewModels/responses/registerLoggedUserViewModel';

const API_SERVER_URL = process.env.VUE_APP_ROOT_API ? process.env.VUE_APP_ROOT_API : 'http://localhost:5000';

class UserApi {
	public registerLoggedOnUser(socketId: string): Promise<RegisterLoggedOnUserResponse> {
		return api.send('POST', `${API_SERVER_URL}/users/register`, { socketId });
	}
}

export const userApi = new UserApi();