"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// 2. Create a Schema corresponding to the document interface
const UserSchema = new mongoose_1.Schema({
    userId: {
        // userId의 속성을 정의한다.
        type: String,
        required: true,
        unique: true, // 유니크 명시
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    pw: {
        type: String,
        required: true,
    },
    fileName: {
        type: String,
        requied: true,
    },
    regdate: {
        type: Date,
        required: true,
        default: () => new Date(),
    },
});
// 3. create a Model and export the Model
exports.default = (0, mongoose_1.model)('User', UserSchema);
