const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./mongodb/connect");
const postRoutes = require("./routes/postRoutes");
const dalleRoutes = require("./routes/dalleRoutes");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/api/v1/post", postRoutes);
app.use("/api/v1/dalle", dalleRoutes);

app.get("/", async (req, res) => {
    res.send("Hello from DALL-E!");
});

const startServer = async () => {
    try {
        connectDB(process.env.MONGODB_URL);
        app.listen(process.env.PORT || 8080, () => console.log("Server has started on port http://localhost:8080"));
    } catch (err) {
        console.log(err);
    }
};

startServer();
