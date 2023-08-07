const router = require("express").Router();

const videosList = require ('../data/videos.json')

const path = require('path');

router.get('/videos', function (request, response) {
  response.send(videosList);
});

router.get('/', function (request, response) {
  response.sendFile(path.join(__dirname, '../public/index.html'));
});

// router.get("/videos/detail", function (req, res) {
//   res.json({ msg: "User POST Endpoint reached" });
// });

//code to create
// router.post("/videos/detail", function (req, res) {
//   res.json({ msg: "User POST Endpoint reached" });
// });

module.exports = router;