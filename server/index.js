import config from "./config.js";
import express from "express";
import videoToken from "./tokens.js";
import pino from "express-pino-logger";

const app = express();
app.use(express.urlencoded({extended : false}));
app.use(express.json());
app.use(pino());

app.get("/api/greeting", (req, res) => {
  const name = req.query.name || "World";
  res.json({ greeting: `Hello ${name}!` });
});

app.get("/video/token", (req, res) => {
  const identity = req.query.identity;
  const room = req.query.room;
  const token = videoToken(identity, room, config);
  res.json({
    token: token.toJwt(),
  });
});

app.post("/video/token", (req, res) => {
  const identity = req.body.identity;
  const room = req.body.room;
  const token = videoToken(identity, room, config);
  res.json({
      token: token.toJwt(),
  });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () =>
  console.log(`Express server is running on localhost: ${PORT}`)
);
