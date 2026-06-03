import { Cart } from "../../Cart";
import { CartDTO } from "../dto/CartDTO";

export class CartMapper {
    static toDTO(cart: Cart): CartDTO {
        return {
            totalItems: cart.totalItems(),
            totalPrice: cart.getTotalPrice().format()
        };
    }
}