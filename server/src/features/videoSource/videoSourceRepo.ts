import { BaseUserRepo } from '../../repository/baseRepo';
import { VideoSourceUrl } from './models/videoSourceUrl';

class VideoSourceRepo extends BaseUserRepo<VideoSourceUrl> {
    constructor() {
        super('videosources');
    }

}

export const videoSourceRepo = new VideoSourceRepo(); 