const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const marketRouter = require("./Market/router");
const productRouter = require("./Product/router");
const MarketsProducts = require("./MarketProduct/router");

const jsonParser = express.json();
app.use(jsonParser);

app.use(marketRouter);
app.use(productRouter);
app.use(MarketsProducts);

app.listen(port, () => console.log(`Listening on port ${port}!`));
