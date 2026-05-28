import { Router } from "express";
import { ProductController } from "../controllers/ProductController";

export function createProductRoutes(controller: ProductController): Router {
    const router = Router();

    router.get("/", (req, res) => {
        void controller.list(req, res);
    });

    return router;
}