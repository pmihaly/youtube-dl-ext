const fs = require('fs');
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const ytdl = require('ytdl-core');
const dotenv = require('dotenv').config();

const app = express();
app.use(morgan('tiny'));

const PORT = process.env.PORT || 3000;

app.get('/:videoId', (req, res) => {
  const { videoId } = req.params;

  ytdl.getInfo(videoId).then((info) => {
    const { title } = info.videoDetails;
    const videoPath = `${path.join(process.env.DL_PATH, title)}.mkv`;

    console.log(`Downloading "${title}"`);

    ytdl(`https://youtube.com/watch?v=${videoId}`).pipe(fs.createWriteStream(videoPath));

    res.json({ success: true, videoPath });
  });
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));
