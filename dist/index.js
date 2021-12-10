"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); // 1
const app = (0, express_1.default)();
const user_1 = __importDefault(require("./api/routes/user"));
app.get('/', (req, res) => {
    // 2
    res.send('Hello World!');
});
app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});
app.use('/users', user_1.default);
