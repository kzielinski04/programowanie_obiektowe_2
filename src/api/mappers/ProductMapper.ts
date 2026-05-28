import { Product } from "../../Product.js";
import { ProductDTO } from "../dto/ProductDTO.js";

export class ProductMapper {
    static toDTO(product: Product): ProductDTO {
        return {
            id: product.id,
            name: product.name,
            price: {
                amount: product.price.amount,
                currency: product.price.currency,
                formatted: product.price.format()
            }

        }
    }
}