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
exports.default = (app) => {
    app.use('/auth', route);
    route.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log('[+] singup');
        console.log(req.body);
        const id = req.body.id;
        const password = req.body.password;
        // 컨테이너에서 인스턴스를 뽑아온다.
        const AuthServiceInstance = typedi_1.default.get(auth_1.AuthService);
        AuthServiceInstance.signUp(id, password);
        res.json({
            success: true,
        });
    }));
};
