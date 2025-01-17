const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const swaggerUI = require("swagger-ui-express");
import { Request, Response } from "express";
import { errorMiddleware } from "./src/middlewares/errorMiddleware";
import { routerV1 } from "./src/routes/v1";
const swaggerJsdoc = require("swagger-jsdoc");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'This is a sample API documentation using Swagger',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: ['./src/routes/v1.ts'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/uploadImage', express.static('uploadImage'));
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs, {
    explorer: true,
    swaggerOptions: {
        persistAuthorization: true,
        displayRequestDuration: true,
    }
}));
app.use("/api/v1", routerV1);
app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Hello from Circle API!" });
})
app.use(errorMiddleware);

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
