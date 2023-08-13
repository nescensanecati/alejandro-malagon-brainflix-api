const express = require('express');
const router = express.Router();
const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

function readVideosDetailsFile() {
  const videosDetails = fs.readFileSync('./data/videoDetails.json')
  const parsedVideosDetailsList = JSON.parse(videosDetails)
  return parsedVideosDetailsList
}


/*GET SECTION*/

// Getting a list of videos
router.get('/', function (request, response) {
  const videos = readVideosDetailsFile()
  response.json(videos);
});

// Getting details for a specific video
router.get("/:videoId", (req, res) => {
  const videos = readVideosDetailsFile();
  const singleVideo = videos.find((video) => video.id === req.params.videoId);
  if (singleVideo == null) {
    res.status(404).json({ "message": "No video with that id exists" });
  }
  else {
    res.status(200).json(singleVideo);
  }
});

//getting comments for a specific video
router.get("/:videoId/comments", (req, res) => {
  const videos = readVideosDetailsFile();
  const singleVideo = videos.find((video) => video.id === req.params.videoId);
  if (singleVideo == null) {
    res.status(404).json({ "message": "No video with that id exists" });
  }
  else {
    res.status(200).json(singleVideo.comments);
  }
});

/*END OF GET SECTION*/

/*POST SECTION*/


// adding specific video
router.post("/", (request, response) => {
  const newVideo = {
    "id": crypto.randomUUID(),
    "title": request.body.title,
    "channel": request.body.channel,
    "image": request.body.image
  };

  const videos = readVideosFile();
  videos.push(newVideo);
  fs.writeFileSync("./data/videos.json", JSON.stringify(videos));
  response.status(201).json(newVideo);
});

/*END OF POST SECTION*/


/*DELETE SECTION*/

//Deleting specific video

router.delete("/:videoId", (req, res) => {
  const videos = readVideosFile();
  const remainingVideos = videos.filter((video) => {
    return video.id !== req.params.videoId;
  });
  fs.writeFileSync("./data/videos.json", JSON.stringify(remainingVideos));

  res.status(200).send('Successfully deleted video');
});

//Deleting specific comment
router.delete("/:videoId/comments/:commentId", (req, res) => {
  const videos = readVideosDetailsFile();
  const selectedVideo = videos.filter((video) => {
    return video.id === req.params.videoId;
  });
  videoComments = selectedVideo[0].comments
  const remainingComments = videoComments.filter((comment) => {
    return comment.id !== req.params.commentId;
  });

  selectedVideo[0].comments = remainingComments;

  fs.writeFileSync("./data/videoDetails.json", JSON.stringify(videos));

  res.status(200).send('Successfully deleted comment');
});


/*END OF DELETE SECTION*/


module.exports = router;