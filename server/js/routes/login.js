"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const login_1 = require("../controllers/login");
const signUp_1 = require("../controllers/signUp");
const router = (0, express_1.Router)();
router.post("/login", login_1.loginController);
router.post("/signup", signUp_1.signUpController);
exports.default = router;
