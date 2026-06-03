export type AddToCartRequestDTO = {
    productId: string;
    quantity: number;
};

export type CartDTO = {
    totalItems: number;
    totalPrice: string;
};