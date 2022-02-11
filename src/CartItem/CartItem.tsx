//Styles
import { Wrapper } from "./CartItem.styles";
//Types
import { CartItemType } from "../App";
//Components
import { Button } from '@material-ui/core';

type Props = {
    item: CartItemType;
    addToCart: (clickedItem: CartItemType) => void;
    removeFromCart: (id: number) => void;
}
const CartItem: React.FC<Props> = ({ item, addToCart, removeFromCart }) => (
    <Wrapper>
        <div>
            <h3>{item.title}</h3>
            <div className="information">
                <p>Price: BDT. {Math.round(.86 * item.price + .05) * 100}</p>
                <p>Sub-Total: BDT. {Math.round(.86 * item.price * item.amount + .05) * 100}</p>
            </div>
            <div className="buttons">
                <Button
                    size="small"
                    disableElevation
                    variant="contained"
                    onClick={() => removeFromCart(item.id)}
                >
                    -
                </Button>
                <p>{item.amount}</p>
                <Button
                    size="small"
                    disableElevation
                    variant="contained"
                    onClick={() => addToCart(item)}
                >
                    +
                </Button>
            </div>
        </div>
        <img src={item.image} alt={item.title} />
    </Wrapper>
);

export default CartItem;