import { Request, Response } from 'express';
import { CreateVideoSourceUrlRequest } from '../../viewModels/requests/createVideoSourceUrlRequest';
import { VideoSourceUrlResponse } from '../../viewModels/responses/videoSourceUrlResponse';
import { videoSourceRepo } from './videoSourceRepo';
import { v4 as uuidv4 } from 'uuid';
import { VideoSourceResponse } from '../../viewModels/responses/videoSourceResponse';

class VideoSourceController {
    
    public async create(httpRequest: Request, response: Response) {
        const request = httpRequest.body as CreateVideoSourceUrlRequest;
        
        const urlRecord = await videoSourceRepo.create({
            id: uuidv4(),
            socketId: request.socketId,
            offer: request.offer
        });

        const urlResponse: VideoSourceUrlResponse = { urlId: urlRecord.id }; 
        response.end(JSON.stringify(urlResponse));
    }

    public async get(httpRequest: Request, response: Response) {
        const videoSourceId = httpRequest.params.id;
        
        const urlRecord = await videoSourceRepo.get(videoSourceId);

        const urlResponse: VideoSourceResponse = {
            id: urlRecord.id,
            socketId: urlRecord.socketId,
            offer: urlRecord.offer
        }; 
        response.end(JSON.stringify(urlResponse));
    }
}

export const videoSourceController = new VideoSourceController();