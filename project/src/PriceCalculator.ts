import { Order } from "./Order";
import { ShippingCalculator } from "./ShippingCalculator";


export default class PriceCalculator {
    readonly tax: number = 0.05
    total: number = 0;

    calculate(order: Order): number {
        this.calculateProductsCost(order);
        this.applyDiscount(order.discount);
        this.applyTax();
        this.applyShippingCost(order);

        return this.total;
    }

    private applyTax(): void {
        this.total += (this.total * this.tax);
    }

    private applyDiscount(discount: number | undefined): void {
        this.total = discount ? this.total * (1.0 - discount) : this.total;
    }

    private applyShippingCost(order: Order): void {
        let shippingCalculator: ShippingCalculator = new ShippingCalculator();
        order.items.forEach((cur): void => {
            shippingCalculator.addProductDetails(cur.product.dimensionsAndWeight, cur.quantity);
        })

        this.total += shippingCalculator.calculate();
    }

    private calculateProductsCost(order: Order): void {
        this.total = 0;
        order.items.forEach((cur): void => {
            this.total += cur.quantity * cur.product.price;
        })
    }
}