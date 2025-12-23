import express from 'express';

import './core/registry';
import routes from './core/routes';

const app = express();

app.get('/ping', function (req, res) {
  res.send('pong');
});

app.use('/api', routes);

export default app;
