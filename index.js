import express from "express";
import mongoose from "mongoose";
import {registerValidations, loginValidations} from "./validations/auth.js";
import {createPostValidations} from "./validations/post.js";
import checkAuth from "./utils/checkAuth.js";
import checkErrors from "./utils/checkErrors.js";
import { login, register, getMe } from "./controllers/UserControllers.js"
import { create, getAll, getOne, remove, update } from "./controllers/PostControllers.js"
import multer from "multer";

mongoose
    .connect("mongodb+srv://admin:wwwwww@diplom.zw5kmps.mongodb.net/blog")
    .then(() => console.log("bd ok"))
    .catch((err) => console.log("bd error", err))

const app = express();

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, "uploads")
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname)
    },
})

const upload = multer({ storage })

app.use(express.json())
app.use("/uploads", express.static("uploads"))

app.post("/auth/login", loginValidations, checkErrors, login)
app.post("/auth/register", registerValidations, checkErrors, register)
app.get("/auth/me", checkAuth, getMe)

app.get("/posts", getAll)
app.get("/posts/:id", getOne)
app.delete("/posts/:id", checkAuth, remove)
app.patch("/posts/:id",checkAuth, createPostValidations, checkErrors, update)
app.post("/posts", checkAuth, createPostValidations, checkErrors, create)

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
    res.json({
        url: `uploads/${req.file.originalname}`
    })
})

app.listen(4444, (err) => {
    if (err) {
        return console.log(`server error: ${err}`);
    }

    console.log("server ok");
})