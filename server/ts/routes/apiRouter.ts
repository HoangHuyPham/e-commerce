import { Router } from "express";
import { authMeGet, authMePost } from "../controllers/authMe";
import { changePassword } from "../controllers/changePassword";
import { loginController } from "../controllers/login";
import { signUpController } from "../controllers/signUp";
import { auth } from "../middlewares/auth";

const apiRouter = Router()

apiRouter.use(["/auth/"], auth)

apiRouter.post("/login", loginController)
apiRouter.post("/signup", signUpController)


apiRouter.get("/auth/me", authMeGet)
apiRouter.post("/auth/me", authMePost)

apiRouter.post("/auth/me/change_password", changePassword)


export default apiRouter