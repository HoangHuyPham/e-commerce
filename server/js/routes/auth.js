"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const login_1 = require("../controllers/login");
const signUp_1 = require("../controllers/signUp");
const authRouter = (0, express_1.Router)();
authRouter.post("/login", login_1.loginController);
authRouter.post("/signup", signUp_1.signUpController);
exports.default = authRouter;
