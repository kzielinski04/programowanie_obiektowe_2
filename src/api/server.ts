import express from "express";
import cors from "cors";
import { InMemoryProductRepository } from "../infra/InMemoryProductRepository";
import { ListProducts } from "../app/ListProducts";
import { ProductController } from "./controllers/ProductController";
import { createProductRoutes } from "./routes/productRoutes";

const app = express();
const productRepository = new InMemoryProductRepository();
const listProducts = new ListProducts(productRepository);
const productController = new ProductController(listProducts);

app.use(cors());
app.use(express.json());
app.use("/api/products", createProductRoutes(productController));

app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
});

const port = 3000;

app.listen(port, () => {
    console.log(`API running on http://localhost:${port}`);
});