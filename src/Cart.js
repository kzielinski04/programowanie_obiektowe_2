"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
var Cart = /** @class */ (function () {
    function Cart(items) {
        this.items = [];
        this.items = items;
    }
    Cart.prototype.printItems = function () {
        for (var _i = 0, _a = this.items; _i < _a.length; _i++) {
            var item = _a[_i];
            console.log("Nazwa: ".concat(item.getName()));
            console.log("Opis: ".concat(item.getDescription()));
            console.log("Cena: ".concat(item.getPrice()));
            console.log("Ilo\u015B\u0107: ".concat(item.getQuantity()));
            console.log("EAN: ".concat(item.getEan()));
            console.log("---------------------------");
        }
    };
    Cart.prototype.addItem = function (cartItem) {
        for (var _i = 0, _a = this.items; _i < _a.length; _i++) {
            var existingItem = _a[_i];
            if (existingItem.getEan() === cartItem.getEan()) {
                existingItem.setQuantity(existingItem.getQuantity() + cartItem.getQuantity());
                return;
            }
        }
        this.items.push(cartItem);
    };
    Cart.prototype.removeItem = function (cartItem) {
        this.items = this.items.filter(function (item) { return item.getEan() !== cartItem.getEan(); });
    };
    Cart.prototype.getTotalWeight = function () {
        return this.items.reduce(function (sum, item) { return sum + (item.getQuantity() * 1); }, 0);
    };
    Cart.prototype.getTotal = function () {
        return this.items.reduce(function (sum, item) { return sum + item.getPrice(); }, 0);
    };
    return Cart;
}());
exports.Cart = Cart;
