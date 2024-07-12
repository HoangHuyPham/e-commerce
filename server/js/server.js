"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const apiRouter_1 = __importDefault(require("./routes/apiRouter"));
const connectDB_1 = __importDefault(require("./connectDB"));
dotenv_1.default.config();
connectDB_1.default.connect();
const app = (0, express_1.default)();
const cors = require("cors");
const PORT = process.env.APP_PORT || 3000;
app.use([express_1.default.json(), cors({ origin: "http://localhost:3000", credentials: true }), express_1.default.urlencoded({ extended: true })]);
app.use("/api/v1", apiRouter_1.default);
app.listen(PORT, () => {
    console.log(`Port start at ${PORT}`);
});
