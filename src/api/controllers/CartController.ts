import { Request, Response } from "express";
import { AddToCart } from "../../app/AddToCart";
import { Checkout } from "../../app/Checkout";
import { Cart } from "../../Cart";
import { CartMapper } from "../mappers/CartMapper";
import { AddToCartRequestDTO } from "../dto/CartDTO";

export class CartController {
    constructor(
        private readonly cart: Cart,
        private readonly addToCart: AddToCart,
        private readonly checkout: Checkout
    ) {}

    getCart(_req: Request, res: Response): void {
        res.json(CartMapper.toDTO(this.cart));
    }

    async addItem(req: Request, res: Response): Promise<void> {
        const body = req.body as AddToCartRequestDTO;

        const result = await this.addToCart.execute(
            body.productId,
            body.quantity
        );

        if (!result.success) {
            if (result.error === "PRODUCT_NOT_FOUND") {
                res.status(404).json({ error: result.error });
                return;
            }
            if (result.error === "INVALID_QUANTITY") {
                res.status(400).json({ error: result.error });
                return;
            }
        }
        
        res.status(201).json(CartMapper.toDTO(this.cart));
    }

    checkoutCart(_req: Request, res: Response): void {
        const result = this.checkout.execute();

        if (!result.success) {
            res.status(400).json({ error: result.error });
            return;
        }
        
        res.json({
            total: result.data.format()
        })
    }
}

