import { Router } from "express";
import { loginController } from "../controllers/login";
import { signUpController } from "../controllers/signUp";
import { auth } from "../middlewares/auth";

const apiRouter = Router()


apiRouter.post("/login", loginController)
apiRouter.post("/signup", signUpController)


export default apiRouter