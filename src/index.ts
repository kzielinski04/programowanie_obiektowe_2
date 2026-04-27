import { Cart } from "./Cart.js";
import { Checkout } from "./app/Checkout.js";
import { InMemoryProductRepository } from "./infra/InMemoryProductRepository.js";
import { AddToCart } from "./app/AddToCart.js";
import { RemoveFromCart } from "./app/RemoveFromCart.js";
import { ClearCart } from "./app/ClearCart.js";
import { CourierShipping } from "./domain/shipping/CourierShipping.js";

async function main() {
    const repo = new InMemoryProductRepository();
    const cart = new Cart();

    const addToCart = new AddToCart(repo, cart);
    const removeFromCart = new RemoveFromCart(cart);
    const clearCart = new ClearCart(cart);

    const addResult1 = await addToCart.execute("1111111111111", 2);
    if (addResult1.success) {
        console.log("UI: Dodano produkt 1");
    } else {
        console.log(`UI Błąd: ${addResult1.error}`);
    }

    const addResult2 = await addToCart.execute("1111111111112", 1);
    if (addResult2.success) {
        console.log("UI: Dodano produkt 2");
    }

    console.log(`Waga całkowita: ${cart.getTotalWeight()}kg`);
    console.log(`Wartość koszyka: ${cart.getTotalPrice().format()}`);

    const shippingMethod = new CourierShipping();
    
    const checkout = new Checkout(cart, shippingMethod);

    const checkoutResult = checkout.execute();

    if (checkoutResult.success) {
        console.log("--- Podsumowanie Zamówienia ---");
        console.log(`Metoda wysyłki: ${checkout.getShippingDetails()}`);
        console.log(`Suma końcowa: ${checkoutResult.data.format()}`);
    } else {
        console.log(`UI Błąd zamówienia: ${checkoutResult.error}`);
    }

    clearCart.execute();
    console.log("UI: Koszyk wyczyszczony");
}

main().catch(err => console.error("Critical Error:", err));