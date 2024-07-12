"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMe_1 = require("../controllers/authMe");
const changePassword_1 = require("../controllers/changePassword");
const login_1 = require("../controllers/login");
const signUp_1 = require("../controllers/signUp");
const auth_1 = require("../middlewares/auth");
const apiRouter = (0, express_1.Router)();
apiRouter.use(["/auth/"], auth_1.auth);
apiRouter.post("/login", login_1.loginController);
apiRouter.post("/signup", signUp_1.signUpController);
apiRouter.get("/auth/me", authMe_1.authMeGet);
apiRouter.post("/auth/me", authMe_1.authMePost);
apiRouter.post("/auth/me/change_password", changePassword_1.changePassword);
exports.default = apiRouter;
