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
//import middlewares from '../middlewares'
const users_1 = __importDefault(require("../../services/users"));
const route = (0, express_1.Router)();
exports.default = (app) => {
    app.use('/users', route); //
    route.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // The actual responsability of the route layer.
        console.log('testest');
        const userDTO = req.body;
        // Call to service layer.
        // Abstraction on how to access the data layer and the business logic.
        let UserServiceInstance = new users_1.default();
        const { user, company } = yield UserServiceInstance.Signup(userDTO);
        // Return a response to client.
        return res.json({ user, company });
    }));
    route.get('/count', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const UserServiceInstance = new users_1.default();
            const count = yield UserServiceInstance.getUserCount();
            const countToday = yield UserServiceInstance.getUserCountToday();
            res.json({
                success: true,
                count: count,
                countToday: countToday,
            });
        }
        catch (e) {
            res.json({
                success: false,
            });
        }
    }));
};
