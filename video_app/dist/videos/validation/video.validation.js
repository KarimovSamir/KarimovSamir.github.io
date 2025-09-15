"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoValidation = void 0;
const video_1 = require("../types/video");
const videoValidation = (data) => {
    const errors = [];
    if (!data.title ||
        typeof data.title !== 'string' ||
        data.title.trim().length < 2 ||
        data.title.trim().length > 40) {
        errors.push({ field: 'title', message: 'Invalid title' });
    }
    if (!data.author ||
        typeof data.author !== 'string' ||
        data.author.trim().length < 2 ||
        data.author.trim().length > 20) {
        errors.push({ field: 'author', message: 'Invalid author' });
    }
    if (data.canBeDownloaded !== undefined && typeof data.canBeDownloaded !== 'boolean') {
        errors.push({ field: 'canBeDownloaded', message: 'Invalid canBeDownloaded' });
    }
    if (data.minAgeRestriction !== undefined &&
        data.minAgeRestriction !== null &&
        (typeof data.minAgeRestriction !== 'number' ||
            !Number.isInteger(data.minAgeRestriction) ||
            data.minAgeRestriction < 1 ||
            data.minAgeRestriction > 18)) {
        errors.push({ field: 'minAgeRestriction', message: 'Invalid minAgeRestriction' });
    }
    if (data.publicationDate !== undefined) {
        if (typeof data.publicationDate !== 'string' ||
            Number.isNaN(Date.parse(data.publicationDate))) {
            errors.push({ field: 'publicationDate', message: 'Invalid publicationDate' });
        }
    }
    if (data.availableResolutions !== undefined) {
        const allowed = Object.values(video_1.VideoResolutions);
        if (!Array.isArray(data.availableResolutions) ||
            data.availableResolutions.some((r) => !allowed.includes(r))) {
            errors.push({
                field: 'availableResolutions',
                message: 'availableResolutions must be array of allowed values',
            });
        }
    }
    return errors;
};
exports.videoValidation = videoValidation;
