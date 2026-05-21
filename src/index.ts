import { Cart } from "./Cart.js";
import { Checkout } from "./app/Checkout.js";
import { InMemoryProductRepository } from "./infra/InMemoryProductRepository.js";
import { InMemoryOrderRepository } from "./infra/InMemoryOrderRepository.js";
import { AddToCart } from "./app/AddToCart.js";
import { ClearCart } from "./app/ClearCart.js";
import { CourierShipping } from "./domain/shipping/CourierShipping.js";
import { StripePayment } from "./domain/payment/StripePayment.js";
import { NotificationService } from "./services/NotificationService.js";
import { Validator } from "./services/Validator.js";
import { LoggingService } from "./services/LoggingService.js";
import { DiscountService } from "./services/DiscountService.js";
import { EventBus } from "./shared/EventBus.js";
import { SendEmailOrderPaid } from "./infra/SendEmailOrderPaid.js";
import { TrackAnalyticsOnOrderPaid } from "./infra/TrackAnalyticsOnOrderPaid.js";


async function main() {
    const productRepo = new InMemoryProductRepository();
    const orderRepo = new InMemoryOrderRepository();
    const cart = new Cart();
    const shipping = new CourierShipping();
    const paymentMethod = new StripePayment();

    const notifier = new NotificationService();
    const validator = new Validator();
    const logger = new LoggingService();
    const discountService = new DiscountService();

    const addToCart = new AddToCart(productRepo, cart);
    const clearCart = new ClearCart(cart);

    await addToCart.execute("1111111111111", 2);
    await addToCart.execute("2222222222222", 1);

    console.log(`Wartość koszyka: ${cart.getTotalPrice().format()}`);


    const eventBus = new EventBus();
    eventBus.subscribe("OrderPaid", new SendEmailOrderPaid());
    eventBus.subscribe("OrderPaid", new TrackAnalyticsOnOrderPaid());

    const checkout = new Checkout(
        shipping,
        paymentMethod,
        orderRepo,
        notifier,
        validator,
        logger,
        discountService,
        eventBus
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