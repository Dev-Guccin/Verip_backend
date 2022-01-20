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
const User_1 = __importDefault(require("../models/User"));
class UserService {
    constructor() { }
    Signup(user) {
        return __awaiter(this, void 0, void 0, function* () {
            //const userRecord = await UserModel.create(user);
            //const companyRecord = await CompanyModel.create(userRecord); // needs userRecord to have the database id
            //const salaryRecord = await SalaryModel.create(userRecord, companyRecord); // depends on user and company to be created
            //await EmailService.startSignupSequence(userRecord)
            //...do more stuff
            const userRecord = "test";
            const companyRecord = "company";
            return { user: userRecord, company: companyRecord };
            this.test("string");
        });
    }
    getUserCount() {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield User_1.default.find({}).count();
            console.log(count);
            return count;
        });
    }
    getUserCountToday() {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield User_1.default.find({
                regdate: {
                    $gte: new Date("2022-01-15"),
                },
            }).count();
            console.log("day count:", count);
            return count;
        });
    }
    test(param) { }
}
exports.default = UserService;
