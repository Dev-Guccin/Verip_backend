"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); // 1
require("module-alias/register");
const body_parser_1 = __importDefault(require("body-parser"));
require("reflect-metadata");
const app = (0, express_1.default)();
const api_1 = __importDefault(require("./api"));
app.use(body_parser_1.default.json());
// add router
app.use('/api', (0, api_1.default)());
app.post('/', (req, res, next) => {
    // 2
    console.log('test');
    console.log(req.body);
    res.send('Hello World!');
});
app.get('/:id/test', (req, res, next) => {
    // 2
    console.log('test');
    console.log(req.params);
    console.log(req.query);
    res.send('Hello World!');
});
app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});
