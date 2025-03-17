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
const node_server_1 = require("@hono/node-server");
const hono_1 = require("hono");
const app = new hono_1.Hono();
(0, node_server_1.serve)(app);
app.get("/generate", (context) => {
    return context.json({
        randomNumber: Math.random(),
    }, 200);
});
app.get("/current-time", (context) => {
    const date = new Date();
    return context.json({
        currentTime: date.toLocaleString(),
    }, 200);
});
app.get("/environment", (context) => {
    const currentNodeVersion = process.version;
    const currentPlatform = process.platform;
    return context.json({
        version: currentNodeVersion,
        platform: currentPlatform,
    }, 200);
});
app.get("/puppet", (context) => {
    const queryParameters = context.req.query();
    return context.json({
        queryParameters,
    }, 200);
});
const numbers = [];
app.post("/numbers", (context) => __awaiter(void 0, void 0, void 0, function* () {
    const body = yield context.req.json();
    const number = body.number;
    numbers.push(number);
    return context.json({
        storedNumber: number,
    }, 200);
}));
app.get("/numbers", (context) => {
    return context.json({
        numbers,
    }, 200);
});
