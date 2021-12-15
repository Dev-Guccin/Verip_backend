"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); // 1
const app = (0, express_1.default)();
const api_1 = __importDefault(require("./api"));
app.get('/', (req, res, next) => {
    // 2
    console.log('test');
    res.send('Hello World!');
});
// add router
app.use('/api', (0, api_1.default)());
app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});
