"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupApp = exports.videoValidation = void 0;
const express_1 = __importDefault(require("express"));
const in_memory_db_1 = require("./db/in-memory.db");
const http_statuses_1 = require("./core/types/http-statuses");
const error_utils_1 = require("./core/utils/error.utils");
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
    if (!Array.isArray(data.videoResolutions)) {
        errors.push({
            field: 'videoFeatures',
            message: 'videoFeatures must be array',
        });
    }
    else if (data.videoResolutions.length) {
        const existingFeatures = Object.values(data.videoResolutions);
        if (data.videoResolutions.length > existingFeatures.length ||
            data.videoResolutions.length < 1) {
            errors.push({
                field: 'videoResolutions',
                message: 'Invalid videoResolutions',
            });
        }
        for (const feature of data.videoResolutions) {
            if (!existingFeatures.includes(feature)) {
                errors.push({
                    field: 'features',
                    message: 'Invalid vehicleFeature:' + feature,
                });
                break;
            }
        }
    }
    return errors;
};
exports.videoValidation = videoValidation;
const setupApp = (app) => {
    app.use(express_1.default.json()); // middleware для парсинга JSON в теле запроса
    // основной роут
    app.get("/", (req, res) => {
        res.status(200).send("Video app");
    });
    app.get("/videos", (req, res) => {
        res.status(200).send(in_memory_db_1.db.videos);
    });
    app.get("/videos/:id", (req, res) => {
        const video = in_memory_db_1.db.videos.find((v) => v.id === +req.params.id);
        if (!video) {
            res.sendStatus(404);
            return;
        }
        res.status(200).send(video);
    });
    app.post("/videos", (req, res) => {
        const errors = (0, exports.videoValidation)(req.body);
        if (errors.length > 0) {
            res.status(http_statuses_1.HttpStatus.BadRequest).send((0, error_utils_1.CreateErrorMessages)(errors));
            return;
        }
        const newVideo = Object.assign({ id: in_memory_db_1.db.videos.length ? in_memory_db_1.db.videos[in_memory_db_1.db.videos.length - 1].id + 1 : 1 }, req.body);
        in_memory_db_1.db.videos.push(newVideo);
        res.status(http_statuses_1.HttpStatus.Created).send(newVideo);
    });
    return app;
};
exports.setupApp = setupApp;
