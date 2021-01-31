import "reflect-metadata";
import express, { json, urlencoded } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import {createConnection} from "typeorm";
import routes from "./routes";
import Middleware from "./middleware";

(async () => {
    const app = express()

    app.use(cors())

    app.use(cookieParser())
    
    app.use(json()); 

    app.use(urlencoded({ extended: true }));

    app.use(Middleware.setResponseLocalsURL)

    app.use(Middleware.serverErrorChecker)

    app.use(Middleware.setAuthToken)

    routes(app)

    app.use(Middleware.pathNotFound)

    app.listen(4000, () => {
        console.log("server started http://localhost:4000")
    })

    await createConnection()
})()
