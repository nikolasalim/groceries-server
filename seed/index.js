const Market = require("../Market/model");
const Product = require("../Product/model");

async function seedMarketAndProducts() {
  const albertHeijn1 = await Market.create({
    name: "AH Jan Van Galenstraat",
    latitude: 52.374886,
    longitude: 4.861366
  });

  const albertHeijn2 = await Market.create({
    name: "AH Jan Evertseenstraat",
    latitude: 52.371952,
    longitude: 4.85716
  });

  const albertHeijn3 = await Market.create({
    name: "AH Postjesweg",
    latitude: 52.364195,
    longitude: 4.855149
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

  albertHeijn1.addOosProducts(toiletPaper, {
    through: { status: "Moderate" }
  });

  albertHeijn1.addOosProducts(cannedTuna, {
    through: { status: "Out of Stock" }
  });

  albertHeijn2.addOosProducts(sunflowerOil, {
    through: { status: "Out of Stock" }
  });

  albertHeijn3.addOosProducts(pasta, {
    through: { status: "Moderate" }
  });
}

seedMarketAndProducts();
