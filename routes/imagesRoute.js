const express = require('express');
const router = express.Router();
const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

router.get("/:videoId", (req, res) => {
    const videosImage = req.params.videoId
    res.sendFile(path.join(__dirname, "../public/images/"+videosImage+".jpeg"));
});

router.get("*", (req, res) => {
    res.status(200).json({ "message": "The correct usage is to add the videoId to the /images path (Example: /images/videoId" });
});

module.exports = router;