export type ProductDTO = {
    id: string;
    name: string;
    price: {
        amount: number;
        currency: string;
        formatted: string;
    };
};