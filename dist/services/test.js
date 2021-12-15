"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typedi_1 = __importStar(require("typedi"));
let Weapon = class Weapon {
    attack() {
        console.log('hit!');
    }
};
Weapon = __decorate([
    (0, typedi_1.Service)()
], Weapon);
let Whip = class Whip extends Weapon {
};
Whip = __decorate([
    (0, typedi_1.Service)()
], Whip);
let Player = class Player {
    constructor(weapon) {
        // 채찍으로 바꾸면 채찍의 클래스가 들어가게 된다.
        this.weapon = weapon;
    }
    attack() {
        this.weapon.attack();
    }
};
Player = __decorate([
    (0, typedi_1.Service)() // 자동으로 Container에 클래스를 삽입한다.
    ,
    __metadata("design:paramtypes", [Whip])
], Player);
const me = typedi_1.default.get(Player); // 컨테이너에서 인스턴스를 뽑아온다.
me.attack(); // 인스턴스의 함수를 바로 사용한다.
