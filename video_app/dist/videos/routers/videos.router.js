"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoRouter = void 0;
const express_1 = require("express");
const in_memory_db_1 = require("../../db/in-memory.db");
const http_statuses_1 = require("../../core/types/http-statuses");
const video_validation_1 = require("../validation/video.validation");
const error_utils_1 = require("../../core/utils/error.utils");
exports.videoRouter = (0, express_1.Router)();
exports.videoRouter.get("/", (req, res) => {
    res.status(200).send(in_memory_db_1.db.videos);
});
exports.videoRouter.get("/:id", (req, res) => {
    const video = in_memory_db_1.db.videos.find((v) => v.id === +req.params.id);
    if (!video) {
        res.sendStatus(404);
        return;
    }
    res.status(200).send(video);
});
exports.videoRouter.post("/", (req, res) => {
    var _a;
    const errors = (0, video_validation_1.videoValidation)(req.body);
    if (errors.length > 0) {
        res.status(http_statuses_1.HttpStatus.BadRequest).send((0, error_utils_1.CreateErrorMessages)(errors));
        return;
    }
    const nowISO = new Date().toISOString();
    const tomorrowISO = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
    const newVideo = {
        id: in_memory_db_1.db.videos.length ? in_memory_db_1.db.videos[in_memory_db_1.db.videos.length - 1].id + 1 : 1,
        title: req.body.title.trim(),
        author: req.body.author.trim(),
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: nowISO,
        publicationDate: tomorrowISO,
        availableResolutions: (_a = req.body.availableResolutions) !== null && _a !== void 0 ? _a : [],
    };
    in_memory_db_1.db.videos.push(newVideo);
    res.status(http_statuses_1.HttpStatus.Created).send(newVideo);
});
exports.videoRouter.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = in_memory_db_1.db.videos.findIndex((v) => v.id === id);
    if (index === -1) {
        res
            .status(http_statuses_1.HttpStatus.NotFound)
            .send((0, error_utils_1.CreateErrorMessages)([{ field: 'id', message: 'Video not found' }]));
        return;
    }
    const errors = (0, video_validation_1.videoValidation)(req.body);
    if (errors.length > 0) {
        res.status(http_statuses_1.HttpStatus.BadRequest).send((0, error_utils_1.CreateErrorMessages)(errors));
        return;
    }
    const video = in_memory_db_1.db.videos[index];
    video.title = req.body.title;
    video.author = req.body.author;
    if (typeof req.body.canBeDownloaded === 'boolean') {
        video.canBeDownloaded = req.body.canBeDownloaded;
    }
    if (req.body.minAgeRestriction !== undefined) {
        video.minAgeRestriction = req.body.minAgeRestriction;
    }
    if (req.body.publicationDate !== undefined) {
        video.publicationDate = req.body.publicationDate; // ISO-строка
    }
    if (req.body.availableResolutions !== undefined) {
        video.availableResolutions = req.body.availableResolutions;
    }
    res.sendStatus(http_statuses_1.HttpStatus.NoContent);
});
exports.videoRouter.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    //ищет первый элемент, у которого функция внутри возвращает true и возвращает индекс этого элемента в массиве,
    //если id ни у кого не совпал, то findIndex вернёт -1.
    const index = in_memory_db_1.db.videos.findIndex((v) => v.id === id);
    if (index === -1) {
        res
            .status(http_statuses_1.HttpStatus.NotFound)
            .send((0, error_utils_1.CreateErrorMessages)([{ field: 'id', message: 'Video not found' }]));
        return;
    }
    in_memory_db_1.db.videos.splice(index, 1);
    res.sendStatus(http_statuses_1.HttpStatus.NoContent);
});
