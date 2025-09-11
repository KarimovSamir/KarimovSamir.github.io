import { VideoResolutions } from '../types/video';

export type VideoInputDto = {
    title: string;
    author: string;
    canBeDownloaded: boolean;
    minAgeRestriction: number | null;
    createdAt: Date;
    publicationDate: Date;
    videoResolutions: VideoResolutions[];
};