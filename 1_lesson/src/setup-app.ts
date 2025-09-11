import express, { Express, Request, Response } from 'express';
import { db } from './db/in-memory.db';
import { HttpStatus } from './core/types/http-statuses';
import { Video } from './videos/types/video';
import { VideoInputDto } from "./videos/dto/video.input-dto";
import { ValidationError } from "./videos/types/validationError";
import { CreateErrorMessages } from "./core/utils/error.utils";

export const videoValidation = (data: VideoInputDto): ValidationError[] => {
    const errors: ValidationError[] = [];

    if (
        !data.title ||
        typeof data.title !== 'string' ||
        data.title.trim().length < 2 ||
        data.title.trim().length > 40
    ) {
        errors.push({ field: 'title', message: 'Invalid title' });
    }

    if (
        !data.author ||
        typeof data.author !== 'string' ||
        data.author.trim().length < 2 ||
        data.author.trim().length > 20
    ) {
        errors.push({ field: 'author', message: 'Invalid author' });
    }

    if (!Array.isArray(data.videoResolutions)) {
        errors.push({
            field: 'videoFeatures',
            message: 'videoFeatures must be array',
        });
    } else if (data.videoResolutions.length) {
        const existingFeatures = Object.values(data.videoResolutions);
        if (
            data.videoResolutions.length > existingFeatures.length ||
            data.videoResolutions.length < 1
        ) {
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

export const setupApp = (app: Express) => {
    app.use(express.json()); // middleware для парсинга JSON в теле запроса

    // основной роут
    app.get("/", (req, res) => {
        res.status(200).send("Video app");
    });

    app.get("/videos", (req: Request, res: Response) => {
        res.status(200).send(db.videos);
    })

    app.get("/videos/:id",
        (
            req: Request<{ id: number }, Video, {}, {}>,
            res: Response <Video | null>,
        ) => {
            const video = db.videos.find((v) => v.id === +req.params.id);
            if (!video) {
                res.sendStatus(404);
                return;
            }
            res.status(200).send(video);
    })

    app.post("/videos", (req: Request, res: Response) => {
        const errors = videoValidation(req.body);

        if (errors.length > 0) {
            res.status(HttpStatus.BadRequest).send(CreateErrorMessages(errors));
            return;
        }

        const newVideo: Video = {
            id: db.videos.length ? db.videos[db.videos.length - 1].id + 1 : 1,
            ...req.body,
        };
        db.videos.push(newVideo);
        res.status(HttpStatus.Created).send(newVideo);
    })

    app.get('/testing', (req: Request, res: Response) => {
        res.status(200).send('testing url');
    });
    app.delete('/testing/all-data', (req: Request, res: Response) => {
        db.videos = [];
        res.sendStatus(HttpStatus.NoContent);
    });

    

    return app;
};