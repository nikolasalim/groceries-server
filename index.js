const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const marketRouter = require("./Market/router");
const productRouter = require("./Product/router");
const marketsProducts = require("./MarketProduct/router");

const cors = require("cors");
const corsMiddleware = cors();
app.use(corsMiddleware);

const jsonParser = express.json();
app.use(jsonParser);

app.use(marketRouter);
app.use(productRouter);
app.use(marketsProducts);

app.listen(port, () => console.log(`Listening on port ${port}!`));
