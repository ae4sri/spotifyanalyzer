import Koa from 'koa';
import json from 'koa-json'
import artistsRouter from './routes/mainRouter'  // route for returning data for songs/artists
import searchRouter from './routes/searchRouter'; // route for handling search queries
const cors = require('@koa/cors');

const app = new Koa();

app.use(json())

app.use(cors());

app.use(searchRouter.routes()).use(artistsRouter.allowedMethods())

app.use(artistsRouter.routes()).use(artistsRouter.allowedMethods())

app.listen(3001, () => console.log("server running on port 3001"));