"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupApp = void 0;
const express_1 = __importDefault(require("express"));
const testing_router_1 = require("./testing/routers/testing.router");
const videos_router_1 = require("./videos/routers/videos.router");
const setupApp = (app) => {
    app.use(express_1.default.json()); // middleware для парсинга JSON в теле запроса
    // основной роут
    app.get("/", (req, res) => {
        res.status(200).send("Video app");
    });
    app.use("/testing", testing_router_1.testingRouter);
    app.use("/videos", videos_router_1.videoRouter);
    return app;
};
exports.setupApp = setupApp;
