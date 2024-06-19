const connectDatabase = require("../config/database");
const products = require("../data/products.json");
const Product = require("../models/productModels");
const dotenv = require("dotenv");

dotenv.config({ path: "config/config.env" });

connectDatabase();

const seedProducts = async () => {
  try {
    await Product.deleteMany();
    console.log("Products deleted!");
    await Product.insertMany(products);
    console.log("All prooducts added!");
  } catch (error) {
    console.log(error.message);
  }
  process.exit()
};

seedProducts();
