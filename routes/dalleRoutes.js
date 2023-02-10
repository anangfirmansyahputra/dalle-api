const express = require("express");
const dotenv = require("dotenv");
const { Configuration, OpenAIApi } = require("openai");

dotenv.config();

const router = express.Router();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// router.route("/").get((req, res) => {});
router.get("/", async (req, res) => {
    res.send("Hello from DALL-E!");
});

router.post("/", async (req, res) => {
    try {
        const { prompt } = req.body;
        const aiResponse = await openai.createImage({
            prompt,
            n: 1,
            size: "1024x1024",
            response_format: "b64_json",
        });

        const image = aiResponse.data.data[0].b64_json;

        res.status(200).json({ photo: image });
    } catch (err) {
        console.log(err);
        res.status(500).send(err?.response.data.error.message);
    }
});

module.exports = router;
