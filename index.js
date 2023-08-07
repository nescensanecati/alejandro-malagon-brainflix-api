const express = require("express");
const app = express();
const videosRoutes = require('./routes/videosRoutes');


app.use('/', videosRoutes);

app.listen(8000, () => {
    console.log("Server Started on http://localhost:8080");
    console.log("Press CTRL + C to stop server");
});