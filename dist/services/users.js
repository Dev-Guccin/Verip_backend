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
Object.defineProperty(exports, "__esModule", { value: true });
class UserService {
    constructor() { }
    Signup(user) {
        return __awaiter(this, void 0, void 0, function* () {
            //const userRecord = await UserModel.create(user);
            //const companyRecord = await CompanyModel.create(userRecord); // needs userRecord to have the database id
            //const salaryRecord = await SalaryModel.create(userRecord, companyRecord); // depends on user and company to be created
            //await EmailService.startSignupSequence(userRecord)
            //...do more stuff
            const userRecord = 'test';
            const companyRecord = 'company';
            return { user: userRecord, company: companyRecord };
            this.test('string');
        });
    }
    test(param) { }
}
exports.default = UserService;
