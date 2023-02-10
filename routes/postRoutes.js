const express = require("express");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary");

const Post = require("../mongodb/models/post");

dotenv.config();

const router = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Get all post
router.get("/", async (req, res) => {
    try {
        const posts = await Post.find({});
        res.status(200).json({ success: true, data: posts });
    } catch (err) {
        res.status(500).json({ success: false, message: err });
    }
});

// Create a post
router.post("/", async (req, res) => {
    try {
        const { name, prompt, photo } = req.body;
        const photoUrl = await cloudinary.uploader.upload(photo);

        const newPost = new Post({
            name,
            prompt,
            photo: photoUrl.url,
        });

        const savedPost = await newPost.save();
        res.status(200).json({ success: true, data: savedPost });
    } catch (err) {
        res.status(500).json({ success: false, message: err });
    }
});

module.exports = router;
