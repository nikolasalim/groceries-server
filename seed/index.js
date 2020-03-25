const Market = require("../Market/model");
const Product = require("../product/model");

async function seedMarketAndProducts() {
  const albertHeijn = await Market.create({
    name: "Albert Heijn",
    latitude: 123,
    longitude: 321
  });

  const jumbo = await Market.create({
    name: "Jumbo",
    latitude: 456,
    longitude: 654
  });

  const dirk = await Market.create({
    name: "Dirk",
    latitude: 789,
    longitude: 987
  });

  const toiletPaper = await Product.create({
    name: "Toiler Paper"
  });

  const pasta = await Product.create({
    name: "Pasta"
  });

  const sunflowerOil = await Product.create({
    name: "Sunflower Oil"
  });

  const cannedTuna = await Product.create({
    name: "Canned Tuna"
  });

  // albertHeijn.addOosProducts(toiletPaper);

  albertHeijn.addOosProducts(toiletPaper, {
    through: { status: "Moderate" }
  });

  albertHeijn.addOosProducts(cannedTuna, {
    through: { status: "Out of Stock" }
  });

  dirk.addOosProducts(sunflowerOil, {
    through: { status: "Out of Stock" }
  });

  jumbo.addOosProducts(pasta, {
    through: { status: "Moderate" }
  });
}

seedMarketAndProducts();
