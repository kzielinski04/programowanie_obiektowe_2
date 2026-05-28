import { Request, Response } from "express";
import { ListProducts } from "../../app/ListProducts.js";
import { ProductMapper } from "../mappers/ProductMapper.js";

export class ProductController {
    constructor(private readonly listProducts: ListProducts) {}

    async list(_req: Request, res: Response): Promise<void> {
        const products = await this.listProducts.execute();

        res.json({
            items: products.map(ProductMapper.toDTO)
        });
    }
}