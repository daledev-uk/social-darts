import {api} from './baseApiClient';
import {CreateVideoSourceUrlRequest} from '../../../../server/src/viewModels/requests/createVideoSourceUrlRequest';
import {VideoSourceUrlResponse} from '../../../../server/src/viewModels/responses/VideoSourceUrlResponse';

const API_SERVER_URL = process.env.VUE_APP_ROOT_API ? process.env.VUE_APP_ROOT_API : 'http://localhost:5000';

class VideoSourceApi {
	public async createLink(socketId: string, offer: string): Promise<string> {
        const request: CreateVideoSourceUrlRequest = { socketId, offer };
		const response: VideoSourceUrlResponse = await api.send('POST', `${API_SERVER_URL}/video-source`, request);
        return `${process.env.VUE_APP_CLIENT_HOST}/video-source/${response.urlId}`;
	}
}

export const videoSourceApi = new VideoSourceApi();