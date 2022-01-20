"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
exports.AuthService = void 0;
require("reflect-metadata");
const typedi_1 = require("typedi");
const crypto_1 = require("crypto");
const User_1 = __importDefault(require("../models/User"));
// 서비스로 type을 설정하여 자동으로 typedi의 Container에 삽입한다.
// 다른곳에서 Container.get(AuthService)로 받아올 수 있다. 문자열로도 선언 가능함.
let AuthService = class AuthService {
    constructor() {
        console.log("AuthService constructor");
    }
    signUp(email, password, userId, filename) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const salt = (0, crypto_1.randomBytes)(32).toString("base64");
                const hashPassword = (0, crypto_1.createHash)("sha512")
                    .update(password + salt)
                    .digest("hex"); //  결과를 hex값으로 바꾼다
                console.log("salt:", salt);
                console.log("hashPassword:", hashPassword);
                const res = yield User_1.default.create({
                    email: email,
                    pw: hashPassword,
                    userId: userId,
                    fileName: filename,
                });
                console.log(res);
                return true;
            }
            catch (e) {
                throw e; // 에러 터뜨리고 종료
                console.log("err:", e);
                return false;
            }
        });
    }
    checkEmailExpression(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const rule = /^[0-9a-zA-Z]*([-_.\\]?[0-9a-zA-Z])*@[0-9a-zA-Z]*([-_.\\]?[0-9a-zA-Z])*.[a-zA-Z]*$/;
            if (!rule.test(email)) {
                console.log("EmailRegex wrong");
                return false;
            }
            else {
                console.log("EmailRegex true");
                return true;
            }
        });
    }
    checkUserIdExpression(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const rule = /^[a-zA-Z0-9]{3,64}$/;
            if (!rule.test(userId)) {
                console.log("userIdRegex false");
                return false;
            }
            else {
                console.log("userIdRegex true");
                return true;
            }
        });
    }
    checkPasswordExpression(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const rule = /^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,64}$/;
            if (!rule.test(userId)) {
                console.log("userIdRegex false");
                return false;
            }
            else {
                console.log("userIdRegex true");
                return true;
            }
        });
    }
    isEmailExist(email) {
        return __awaiter(this, void 0, void 0, function* () {
            // 이메일이 디비에 저장되어 있는지 판단한다.
            const res = yield User_1.default.findOne({
                email: email,
            });
            return res;
        });
    }
    checkId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            // 이메일이 디비에 저장되어 있는지 판단한다.
            const res = yield User_1.default.findOne({
                userId: userId,
            });
            return res;
        });
    }
};
AuthService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], AuthService);
exports.AuthService = AuthService;
