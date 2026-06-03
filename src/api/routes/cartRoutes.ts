import { Router } from "express";
import { CartController } from "../controllers/CartController";

export function createCartRoutes(controller: CartController): Router {
    const router = Router();

    router.get("/", (req, res) => {
        controller.getCart(req, res);
    });

    router.post("/items", (req, res) => {
        void controller.addItem(req, res);
    });

    router.post("/checkout", (req, res) => {
        controller.checkoutCart(req, res);
    });

    return router;
}