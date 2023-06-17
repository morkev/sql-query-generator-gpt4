import express, { Application, Request, Response } from "express";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";
import * as dotenv from "dotenv";
dotenv.config();
const PORT: number = 8000;

const app: Application = express();
app.use(cors());
app.use(express.json());

const API_KEY: string = '1234567890';

const configuration = new Configuration({
    apiKey: API_KEY
});

const openai = new OpenAIApi(configuration);

app.post("/completions", async (req: Request, res: Response) => {
    try {
        const completion = await openai.createChatCompletion({
            model: "gpt-4",
            messages: [
                {role: "user", content: "Create an SQL request to " + req.body.message}
            ]
        });
        res.send(completion.data.choices[0].message);
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
});

app.listen(PORT, () => console.log('Your server is running on PORT ${PORT}'));