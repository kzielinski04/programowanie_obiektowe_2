// src/index.ts
import { Cart } from "./Cart.js";
import { Checkout } from "./app/Checkout.js";
import { InMemoryProductRepository } from "./infra/InMemoryProductRepository.js";
import { AddToCart } from "./app/AddToCart.js";
import { ClearCart } from "./app/ClearCart.js";
import { CourierShipping } from "./domain/shipping/CourierShipping.js";
import { NotificationService } from "./services/NotificationService.js";
import { Validator } from "./services/Validator.js";
import { LoggingService } from "./services/LoggingService.js";
import { DiscountService } from "./services/DiscountService.js";

async function main() {
    const repo = new InMemoryProductRepository();
    const cart = new Cart();
    const shipping = new CourierShipping();

    const notifier = new NotificationService();
    const validator = new Validator();
    const logger = new LoggingService();
    const discountService = new DiscountService();

    const addToCart = new AddToCart(repo, cart);
    const clearCart = new ClearCart(cart);

    await addToCart.execute("1111111111111", 2);
    await addToCart.execute("1111111111112", 1);

    console.log(`Wartość koszyka: ${cart.getTotalPrice().format()}`);

    const checkout = new Checkout(
        shipping,
        paymentMethod,
        repo,
        notifier,
        validator,
        logger,
        discountService
    );

    const checkoutResult = await checkout.execute(cart);

    if (checkoutResult.success) {
        console.log("UI: Zamówienie zakończone sukcesem!");
        
        console.log("UI: Klient anulował zamówienie po czasie. Wykonuję zwrot...");
        const refundResult = await paymentMethod.refund(cart.getTotalPrice());
        if (refundResult.success) {
            console.log("UI: Pomyślnie zwrócono środki.");
        }
    } else {
        console.log(`UI Błąd zamówienia: ${checkoutResult.error}`);
    }

    clearCart.execute();
}

main().catch(err => console.error("Critical Error:", err));