import dotenv from "dotenv";
import express, { Express } from "express";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import { routerV1 } from "./routes/v1";
import swaggerUI from "swagger-ui-express";
import swaggerDocument from "../swagger/swagger-output.json"
import cors from "cors"

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors())
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument, {
    explorer: true,
    swaggerOptions: {
        persistAuthorization: true,
        displayRequestDuration: true,
    }
}));
app.use("/api/v1", routerV1);

app.use(errorMiddleware);

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
