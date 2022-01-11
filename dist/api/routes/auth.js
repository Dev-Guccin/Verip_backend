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
const auth_1 = require("@src/services/auth");
const route = (0, express_1.Router)();
const multer_1 = __importDefault(require("multer"));
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
fs_1.default.readdir("uploads", (err) => {
    if (err) {
        fs_1.default.mkdirSync("uploads");
    }
});
const upload = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({
        destination(req, file, cb) {
            cb(null, "uploads/");
        },
        filename(req, file, cb) {
            const ext = path_1.default.extname(file.originalname); // 파일 확장자
            const timestamp = new Date().getTime().valueOf(); // 현재 시간
            // 새 파일명(기존파일명 + 시간 + 확장자)
            const filename = path_1.default.basename(file.originalname, ext) + timestamp + ext;
            cb(null, filename);
        },
    }),
});
exports.default = (app) => __awaiter(void 0, void 0, void 0, function* () {
    app.use('/auth', route);
    route.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log('[+] singup');
        console.log(req.body);
        const id = req.body.id;
        const email = req.body.email;
        const password = req.body.password;
        // 컨테이너에서 인스턴스를 뽑아온다.
        const AuthServiceInstance = typedi_1.default.get(auth_1.AuthService);
        // 실행과 동시에 값을 확인한다.
        if (yield AuthServiceInstance.signUp(id, email, password)) {
            res.json({
                success: true,
            });
        }
        else {
            res.json({
                success: false,
            });
        }
    }));
    route.post("/upload", upload.single("image"), (req, res) => {
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
