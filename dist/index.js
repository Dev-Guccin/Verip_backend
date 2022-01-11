"use strict"
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, "__esModule", { value: true })
const express_1 = __importDefault(require("express")) // 1
const config_1 = __importDefault(require("./config"))
require("module-alias/register")
require("reflect-metadata")
const loader_1 = __importDefault(require("@src/loader"))
function startServer() {
  return __awaiter(this, void 0, void 0, function* () {
    console.log("start server....")
    const app = (0, express_1.default)()
    // loader를 이용하여 서버 mongodb연동과 express설정을 시작한다.
    yield (0, loader_1.default)(app)
    app.listen(config_1.default.port, () => {
      console.log(`Example app listening on port ${config_1.default.port}!🚀`)
    })
  })
}
startServer()
