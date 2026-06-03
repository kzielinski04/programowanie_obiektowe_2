import express from "express";
import cors from "cors";
import { InMemoryProductRepository } from "../infra/InMemoryProductRepository";
import { ListProducts } from "../app/ListProducts";
import { ProductController } from "./controllers/ProductController";
import { createProductRoutes } from "./routes/productRoutes";
import { Cart } from "../Cart";
import { AddToCart } from "../app/AddToCart";
import { Checkout } from "../app/Checkout";
import { CourierShipping } from "../domain/shipping/CourierShipping";
import { CartController } from "./controllers/CartController";
import { createCartRoutes } from "./routes/cartRoutes";

const app = express();
const productRepository = new InMemoryProductRepository();
const listProducts = new ListProducts(productRepository);
const productController = new ProductController(listProducts);
const cart = new Cart();
const addToCart = new AddToCart(productRepository, cart);
const checkout = new Checkout(cart, new CourierShipping());

const cartController = new CartController(cart, addToCart, checkout);

app.use(cors());
app.use(express.json());
app.use("/api/products", createProductRoutes(productController));
app.use("/api/cart", createCartRoutes(cartController));

app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
});

const port = 3000;

app.listen(port, () => {
    console.log(`API running on http://localhost:${port}`);
});