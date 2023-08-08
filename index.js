const cors = require('cors')
const express = require("express");
const homepageRoutes = require('./routes/homepageRoutes');
const videosRoutes = require('./routes/videosRoutes');
const notFoundRoutes = require('./routes/notFoundRoutes');

require('dotenv').config()
const PORT = process.env.PORT

const app = express();


app.use(cors({
    origin: '*',
})
)

app.use(express.json());

app.use('/', homepageRoutes);

app.use('/videos', videosRoutes);

app.use('/*', notFoundRoutes);

app.listen(PORT, () => {
    console.log("Server Started on http://localhost:" + PORT);
    console.log("Press CTRL + C to stop server");
});