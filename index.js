import express from "express";
import mongoose from "mongoose";
import {registerValidations, loginValidations} from "./validations/auth.js";
import {createPostValidations} from "./validations/post.js";
import checkAuth from "./utils/checkAuth.js";
import checkErrors from "./utils/checkErrors.js";
import { login, register, getMe } from "./controllers/UserControllers.js"
import { create } from "./controllers/PostControllers.js"

mongoose
    .connect("mongodb+srv://admin:wwwwww@diplom.zw5kmps.mongodb.net/blog")
    .then(() => console.log("bd ok"))
    .catch((err) => console.log("bd error", err))

const app = express();
app.use(express.json())


app.post("/auth/login", loginValidations, checkErrors, login)
app.post("/auth/register", registerValidations, checkErrors, register)
app.get("/auth/me", checkAuth, getMe)

// app.get("/posts", getAll)
// app.get("/posts/:id", getOne)
// app.delete("/posts", remove)
// app.patch("/posts", update)

app.post("/posts", checkAuth, createPostValidations, checkErrors, create)


app.listen(4444, (err) => {
    if (err) {
        return console.log(`server error: ${err}`);
    }

    console.log("server ok");
})