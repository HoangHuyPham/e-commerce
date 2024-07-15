import { Router } from "express";
import { authMeGet, authMePost } from "../controllers/authMe";
import { changePassword } from "../controllers/changePassword";
import { loginController } from "../controllers/login";
import { signUpController } from "../controllers/signUp";
import { upload, uploadAvatar } from "../controllers/upload";
import { auth } from "../middlewares/auth";
import multer from "multer"
import { limitSize } from "../middlewares/limitSize";

const apiRouter = Router()
const storage = multer.memoryStorage()
const multerFilter = multer({ storage: storage }).single("image")


apiRouter.use(["/auth/"], auth)

apiRouter.post("/login", loginController)
apiRouter.post("/signup", signUpController)


apiRouter.get("/auth/me", authMeGet)
apiRouter.post("/auth/me", authMePost)

apiRouter.post("/auth/me/change_password", changePassword)


apiRouter.post("/auth/upload/avatar", multerFilter, limitSize, uploadAvatar)
apiRouter.post("/auth/upload", multerFilter, limitSize, upload)


export default apiRouter