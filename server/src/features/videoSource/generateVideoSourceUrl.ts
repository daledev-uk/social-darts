import { Request, Response } from 'express';
import { CreateVideoSourceUrlRequest } from '../../viewModels/requests/createVideoSourceUrlRequest';
import { VideoSourceUrlResponse } from '../../viewModels/responses/videoSourceUrlResponse';
import { videoSourceRepo } from './videoSourceRepo';
import { v4 as uuidv4 } from 'uuid';

class GenerateVideoSourceUrl {
    
    public async run(httpRequest: Request, response: Response) {
        const request = httpRequest.body as CreateVideoSourceUrlRequest;
        
        const urlRecord = await videoSourceRepo.create({
            id: uuidv4(),
            socketId: request.socketId,
            offer: request.offer
        });

        const urlResponse: VideoSourceUrlResponse = { urlId: urlRecord.id }; 
        response.end(JSON.stringify(urlResponse));
    }
}

export const generateVideoSourceUrl = new GenerateVideoSourceUrl();