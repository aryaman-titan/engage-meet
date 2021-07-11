import './bootstrap-globals';
import { createExpressHandler } from './createExpressHandler';
import express, { RequestHandler } from 'express';
import path from 'path';
import { ServerlessFunction } from './types';

const PORT = process.env.PORT ?? 8080;

const app = express();
app.use(express.json());

const tokenFunction: ServerlessFunction = require('@twilio-labs/plugin-rtc/src/serverless/functions/token').handler;
const tokenEndpoint = createExpressHandler(tokenFunction);

const recordingRulesFunction: ServerlessFunction = require('@twilio-labs/plugin-rtc/src/serverless/functions/recordingrules')
  .handler;
const recordingRulesEndpoint = createExpressHandler(recordingRulesFunction);

const noopMiddleware: RequestHandler = (_, __, next) => next();
const authMiddleware = noopMiddleware;

app.all('/token', authMiddleware, tokenEndpoint);
app.all('/recordingrules', authMiddleware, recordingRulesEndpoint);

app.use((req, res, next) => {
  if (req.path === '/' || req.path === 'index.html') {
    res.set('Cache-Control', 'no-cache');
  } else {
    res.set('Cache-Control', 'max-age=31536000');
  }
  next();
});

app.use(express.static(path.join(__dirname, '../build')));

app.get('*', (_, res) => {
  // Don't cache index.html
  res.set('Cache-Control', 'no-cache');
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.listen(PORT, () => console.log(`Signalling server running on ${PORT}`));
