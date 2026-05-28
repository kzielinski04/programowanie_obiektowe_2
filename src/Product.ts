import { Feature } from "./Feature.js";
import { ShippingFeature } from "./ShippingFeature.js";
import { ok, fail } from "./shared/Result.js";
import type { Result } from "./shared/Result.js";
import { Money } from "./domain/Money.js";

type ProductError =
    | "INVALID_NAME"
    | "INVALID_PRICE"
    | "INVALID_DESCRIPTION"
    | "INVALID_EAN";

export class Product {
    private features: Feature[] = [];

    private constructor(
        private _price: Money,
        private _description: string,
        private _name: string,
        private _id: string
    ) { }

    public static isProduct(obj: unknown): obj is Product {
        return obj instanceof Product;
    }

    public static create(
        _price: Money,
        _description: string,
        _name: string,
        _id: string,
        features: Feature[] = []
    ): Result<Product, ProductError> {
        if (_name.length === 0) return fail("INVALID_NAME");
        if (_price.amount <= 0) return fail("INVALID_PRICE");
        if (_description.length === 0) return fail("INVALID_DESCRIPTION");

        if (_id.length !== 13 || !/^\d+$/.test(_id)) {
            return fail("INVALID_EAN");
        }

        const product = new Product(_price, _description, _name, _id);

        try {
            features.forEach(f => product.addFeature(f));
        } catch (e) {
            throw e;
        }

        return ok(product);
    }

    get price() { return this._price; }
    get description() { return this._description; }
    get name() { return this._name; }
    get id() { return this._id; }

    public setPrice(price: Money): Result<void, "INVALID_PRICE"> {
        if (price.amount <= 0) return fail("INVALID_PRICE");
        this._price = price;
        return ok(undefined);
    }

    public setDescription(description: string): Result<void, "INVALID_DESCRIPTION"> {
        if (description.length === 0) return fail("INVALID_DESCRIPTION");
        this._description = description;
        return ok(undefined);
    }

    public setName(name: string): Result<void, "INVALID_NAME"> {
        if (name.length === 0) return fail("INVALID_NAME");
        this._name = name;
        return ok(undefined);
    }

    public setEan(ean: string): Result<void, "INVALID_EAN"> {
        if (ean.length !== 13 || !/^\d+$/.test(ean)) {
            return fail("INVALID_EAN");
        }
        this._id = ean;
        return ok(undefined);
    }

    public getFeatures<T extends Feature>(type: new (...args: any[]) => T): T[] {
        return this.features.filter((f): f is T => f instanceof type);
    }

    public addFeature(feature: Feature): void {
        if (feature instanceof ShippingFeature) {
            const hasShipping = this.features.some(f => f instanceof ShippingFeature);
            if (hasShipping) {
                throw new Error("Product cannot have more than one ShippingFeature!");
            }
        }
        this.features.push(feature);
    }
}