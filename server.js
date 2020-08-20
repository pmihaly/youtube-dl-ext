const fs = require('fs');
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const ytdl = require('ytdl-core');
const dotenv = require('dotenv').config();

const app = express();

if (typeof global.it !== 'function') {
  app.use(morgan('tiny'));
}

const PORT = process.env.PORT || 3000;
const DL_PATH = process.env.DL_PATH || __dirname;

app.get('/ping', (_, res) => {
  res.json({ result: 'pong' });
});

app.get('/:videoId', async (req, res) => {
  const { videoId } = req.params;

  try {
    const info = await ytdl.getInfo(videoId);

    const { title } = info.videoDetails;
    const videoPath = `${path.join(DL_PATH, title)}.mkv`;

    ytdl(`https://youtube.com/watch?v=${videoId}`).pipe(fs.createWriteStream(videoPath));

    res.json({ success: true, videoPath });
  } catch (error) {
    let errCode;
    if (error === `Error: no video id found: ${videoId}`){
      errCode = 404;
    } else {
      errCode = 500;
    }

    res.status(errCode).json({ success: false, error:error.toString() });
  }
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));

module.exports = app;
