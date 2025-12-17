import app from './app';
import config from './config/config';

app.listen(config.PORT, function () {
  console.log('APP RUNNING ON PORT:', config.PORT);
});
