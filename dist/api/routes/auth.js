"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const typedi_1 = __importDefault(require("typedi"));
const auth_1 = require("../../services/auth");
const route = (0, express_1.Router)();
const multer_1 = __importDefault(require("multer"));
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
fs_1.default.readdir('uploads', (err) => {
    if (err) {
        fs_1.default.mkdirSync('uploads');
    }
});
const upload = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({
        // 파일이 저장될 경로
        destination(req, file, cb) {
            cb(null, 'uploads/');
        },
        filename(req, file, cb) {
            const ext = path_1.default.extname(file.originalname); // 파일 확장자
            //const timestamp = new Date().getTime().valueOf();	// 현재 시간
            // 새 파일명(기존파일명 + 시간 + 확장자)
            const uniqueId = (0, uuid_1.v4)(); //
            const filename = path_1.default.basename(uniqueId, ext) + ext;
            cb(null, filename);
        },
    }),
});
exports.default = (app) => __awaiter(void 0, void 0, void 0, function* () {
    app.use('/auth', route);
    route.post('/exist-email', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const AuthServiceInstance = typedi_1.default.get(auth_1.AuthService);
        const email = req.body.email;
        if ((yield AuthServiceInstance.isEmailExist(email)) != null) {
            return res.json({
                success: true,
            });
        }
        else {
            return res.json({
                success: false,
            });
        }
    }));
    route.post('/exist-id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const AuthServiceInstance = typedi_1.default.get(auth_1.AuthService);
        const userId = req.body.userId;
        if ((yield AuthServiceInstance.checkId(userId)) != null) {
            return res.json({
                success: true,
            });
        }
        else {
            return res.json({
                success: false,
            });
        }
    }));
    route.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log('[+] singup');
        console.log(req.body);
        const email = req.body.email;
        const password = req.body.password;
        const userId = req.body.id;
        const filename = req.body.filename;
        const AuthServiceInstance = typedi_1.default.get(auth_1.AuthService);
        // 정규식 검증
        if (!(yield AuthServiceInstance.checkEmailExpression(email))) {
            return res.json({
                success: false,
                message: 'email Expression is wrong',
            });
        }
        if (!(yield AuthServiceInstance.checkUserIdExpression(userId))) {
            return res.json({
                success: false,
                message: 'userId Expression is wrong',
            });
        }
        if (!(yield AuthServiceInstance.checkPasswordExpression(password))) {
            return res.json({
                success: false,
                message: 'password Expression is wrong',
            });
        }
        // 컨테이너에서 인스턴스를 뽑아온다.
        if ((yield AuthServiceInstance.isEmailExist(email)) != null) {
            return res.json({
                success: false,
                message: 'email is already exist',
            });
        }
        if ((yield AuthServiceInstance.checkId(userId)) != null) {
            return res.json({
                success: false,
                message: 'userid is already exist',
            });
        }
        // 실행과 동시에 값을 확인한다.
        if (yield AuthServiceInstance.signUp(email, password, userId, filename)) {
            return res.json({
                success: true,
            });
        }
        else {
            return res.json({
                success: false,
            });
        }
    }));
    route.post('/upload', upload.single('image'), (req, res) => {
        try {
            (0, sharp_1.default)(req.file.path) // 압축할 이미지 경로
                .resize({ width: 600 }) // 비율을 유지하며 가로 크기 줄이기
                .withMetadata() // 이미지의 exif데이터 유지
                .toBuffer((err, buffer) => {
                if (err)
                    throw err;
                // 압축된 파일 새로 저장(덮어씌우기)
                fs_1.default.writeFile(req.file.path, buffer, (err) => {
                    if (err)
                        throw err;
                });
            });
        }
        catch (err) {
            console.log(err);
        }
        res.json({ filename: `${req.file.filename}` });
    });
});
