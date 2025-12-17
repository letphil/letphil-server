import express from 'express';

const app = express();

app.get('/ping', function (req, res) {
  res.send('pong');
});

export default app;
