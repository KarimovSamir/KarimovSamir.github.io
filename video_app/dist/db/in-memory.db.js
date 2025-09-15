"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const video_1 = require("../videos/types/video");
exports.db = {
    videos: [
        {
            id: 1,
            title: 'Tomb Raider',
            author: 'America',
            canBeDownloaded: true,
            minAgeRestriction: 18,
            createdAt: '2025-09-13T11:22:33.456Z',
            publicationDate: '2025-09-13T11:22:33.456Z',
            availableResolutions: [video_1.VideoResolutions.P2160],
        },
        {
            id: 2,
            title: '3 Bogatirya',
            author: 'Russia',
            canBeDownloaded: false,
            minAgeRestriction: 8,
            createdAt: '2025-08-13T11:22:33.456Z',
            publicationDate: '2025-08-13T11:22:33.456Z',
            availableResolutions: [video_1.VideoResolutions.P720],
        },
    ],
};
