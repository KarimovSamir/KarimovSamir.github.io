import { Video, VideoResolutions } from '../videos/types/video';

export const db = {
    videos: <Video[]>[
        {
            id: 1,
            title: 'Tomb Raider',
            author: 'America',
            canBeDownloaded: true,
            minAgeRestriction: 18,
            createdAt: new Date(),
            publicationDate: new Date(),
            videoResolutions: [VideoResolutions.P2160],
        },
        {
            id: 2,
            title: '3 Bogatirya',
            author: 'Russia',
            canBeDownloaded: false,
            minAgeRestriction: 8,
            createdAt: new Date(),
            publicationDate: new Date(),
            videoResolutions: [VideoResolutions.P720],
        },
    ],
};
