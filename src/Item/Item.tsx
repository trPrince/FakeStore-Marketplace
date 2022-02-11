import { Button } from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
//Types
import { CartItemType } from "../App";
//Styles
import { Wrapper } from "./Item.styles";

type Props = {
    item: CartItemType;
    handleAddToCart: (clickedItem: CartItemType) => void;
}

const Item: React.FC<Props> = ({ item, handleAddToCart }) => (
    <Wrapper>
        <img src={item.image} alt={item.title} />
        <div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <h3>BDT. {Math.round(.86 * item.price + .05) * 100}</h3>
        </div>
        <Button onClick={() => handleAddToCart(item)}>
                Add To Cart!
                <AddShoppingCart />
        </Button>
    </Wrapper>
)

export default Item;