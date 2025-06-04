import dotenv from "dotenv"
import express from "express"
import { dbconnection } from "./database/dbconnection.js";
import scraperrouter from "./routes/scraperroute.js"

const app = express();

dotenv.config({path : "./config/config.env"})
dbconnection();
app.use(express.json());
app.use("/api/v1/scrape", scraperrouter);



export default app;