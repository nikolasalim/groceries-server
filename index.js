const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const marketRouter = require("./market/router");
const productRouter = require("./product/router");
const outOfStockProduct = require("./out-of-stock-product/router");

const jsonParser = express.json();
app.use(jsonParser);

app.use(marketRouter);
app.use(productRouter);
app.use(outOfStockProduct);

app.listen(port, () => console.log(`Listening on port ${port}!`));
