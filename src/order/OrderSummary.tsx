import * as _ from "lodash";

type Flavor = 'apricot' | 'strawberry';
const FLAVOR_STOCK: Record<Flavor, number> = {
    apricot: 3,
    strawberry: 14
} as const;

type OrderSummaryProps = {
    name: string,
    phone: string,
    email: string,
    address: string,
    preferredCommunication: string,
    receptionMethod: string,
    selectedFlavors: Record<Flavor, number>
}

function OrderSummary({
    name,
    phone,
    email,
    address,
    preferredCommunication,
    receptionMethod,
    selectedFlavors,
}: OrderSummaryProps) {


    const prices = Object.entries(selectedFlavors)
        .filter(([_, quantity]) => !!quantity)
        .map(([flavor, quantity]) => {
            return [quantity * 9, quantity * 19];
         });
    const lowerJamCost = prices.reduce((acc: number, [lower, upper]) => { return acc + lower; }, 0);
    const upperJamCost = prices.reduce((acc: number, [lower, upper]) => { return acc + upper; }, 0)
    const receptionCost = receptionMethod === 'shipping' ? 10 : receptionMethod === 'delivery' ? 5 : 0;

    return <div className="flex flex-col gap-4">
            <div className="flex gap-16">
                <ul>
                    <li>{name}</li>
                    <li>{phone}</li>
                    <li>{email}</li>
                    <li>{address}</li>
                    <li>{`Preferred communication: ${preferredCommunication}`}</li>
                </ul>
            </div>
            <div className="flex gap-16 justify-between">
                <ul>
                    {Object.entries(selectedFlavors).filter(([_, quantity]) => !!quantity).map(([flavor, quantity]) => {
                        return <li>{`${quantity} ${flavor}`}</li>
                    })}
                </ul>
                <ul>
                    {prices.map(([lower, higher]) => {
                        return <li>{`$${lower}-${higher}`}</li>
                    })}
                </ul>
            </div>
            <div className="flex gap-16 justify-between">
                {receptionMethod}
                <div>
                    {receptionMethod === 'delivery' && '$5'}
                    {receptionMethod === 'shipping' && '$10'}
                    {receptionMethod === 'pickup' && '$0'}
                </div>
            </div>
            <hr />
            <div className="flex gap-16 justify-between">
                <div>Total</div>
                <div>
                    {`$${lowerJamCost + receptionCost}-${upperJamCost + receptionCost}`}
                </div>
            </div>
        </div>
};

export default OrderSummary;