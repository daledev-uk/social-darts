import {api} from './baseApiClient';
import {CreateVideoSourceUrlRequest} from '../../../../server/src/viewModels/requests/createVideoSourceUrlRequest';
import {VideoSourceUrlResponse} from '../../../../server/src/viewModels/responses/VideoSourceUrlResponse';
import {VideoSourceResponse} from '../../../../server/src/viewModels/responses/VideoSourceResponse';

const API_SERVER_URL = process.env.VUE_APP_ROOT_API ? process.env.VUE_APP_ROOT_API : 'http://localhost:5000';

class VideoSourceApi {
	public async createLink(socketId: string, p2pId: string, offer: string): Promise<string> {
        const request: CreateVideoSourceUrlRequest = { socketId, offer };
		const response: VideoSourceUrlResponse = await api.send('POST', `${API_SERVER_URL}/video-source`, request);
        return `${process.env.VUE_APP_CLIENT_HOST}/video-source/${response.urlId}`;
	}

    public get(videoSourceId: string): Promise<VideoSourceResponse> {
        return api.send('GET', `${API_SERVER_URL}/video-source/${videoSourceId}`);
    }
}

export const videoSourceApi = new VideoSourceApi();