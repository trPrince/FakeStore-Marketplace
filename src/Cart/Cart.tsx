import CartItem from '../CartItem/CartItem';
//Styles
import { CartWrapper } from "./Cart.styles";
//Types
import { CartItemType } from '../App';

type Props = {
    cartItems: CartItemType[];
    addToCart: (clickedItem: CartItemType) => void;
    removeFromCart: (id: number) => void;
};

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart }) => {
    const calculateTotal = (items: CartItemType[]) =>
        items.reduce((ack: number, item) =>
            ack + Math.round( .86 * item.amount * item.price + 0.05) * 100
        ,0);

    return (
        <CartWrapper>
            <h2>Your Cart!</h2>
            {!cartItems.length && <p>No Items in cart!</p>}
            {cartItems.map((item) => (
                    <CartItem 
                        key={item.id}
                        item={item}
                        addToCart={addToCart}
                        removeFromCart={removeFromCart}
                    />
                )
            )}
            <h3>Total: BDT. {calculateTotal(cartItems)}</h3>
        </CartWrapper>
    )
};

export default Cart;