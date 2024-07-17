import { Router } from "express";
import multer from "multer";
import { authMeGet, authMePost } from "../controllers/authMe";
import { changePassword } from "../controllers/changePassword";
import { loginController } from "../controllers/login";
import { addProductPost, deleteProductPost, productGet, productGetPagination, updateProductPost } from "../controllers/product";
import { signUpController } from "../controllers/signUp";
import { uploadAvatar, uploadPreview } from "../controllers/upload";
import { auth } from "../middlewares/auth";
import { isAdmin } from "../middlewares/isAdmin";
import { limitSize } from "../middlewares/limitSize";

const apiRouter = Router()
const storage = multer.memoryStorage()
const multerFilter = multer({ storage: storage}).single("image")


apiRouter.use(["/auth/"], auth)


apiRouter.post("/login", loginController)
apiRouter.post("/signup", signUpController)



apiRouter.get("/auth/me", authMeGet)
apiRouter.post("/auth/me", authMePost)

apiRouter.get("/products/:page", productGet)
apiRouter.get("/products", productGetPagination)

apiRouter.post("/auth/me/change_password", changePassword)

apiRouter.post("/auth/products/add" ,isAdmin, addProductPost)
apiRouter.post("/auth/products/update" ,isAdmin, updateProductPost)
apiRouter.post("/auth/products/delete" ,isAdmin, deleteProductPost)
apiRouter.post("/auth/upload/preview/:id", isAdmin, multerFilter, limitSize, uploadPreview)
apiRouter.post("/auth/upload/avatar", multerFilter, limitSize, uploadAvatar)


export default apiRouter