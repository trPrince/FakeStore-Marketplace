import { useState } from "react";
import { useQuery } from "react-query";
//Components
import Item from "./Item/Item";
import Cart from "./Cart/Cart";
import { Grid, Badge, Drawer, LinearProgress } from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
//Styles
import { Wrapper, StyledButton } from "./App.styles";
//Types
export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
}

const getProducts = async() : Promise<CartItemType[]> =>
  await (await fetch('https://fakestoreapi.com/products')).json();

const App: React.FC = () => {
  const [cartOpened, setCartOpened] = useState(false);
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const {data, isLoading, error } = useQuery<CartItemType[]>(
    'products',
    getProducts
  );
  console.log(data);

  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((accumulator: number, item) => accumulator + item.amount, 0);

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems((prevCartItems) => {
      const isItemInCart = prevCartItems.find(item => item.id === clickedItem.id);
      if (isItemInCart) {
        return prevCartItems.map(item =>
          item.id === clickedItem.id
            ? {...item, amount: item.amount +1}
            : item
        );
      }
      return [
      ...prevCartItems,
      {...clickedItem, amount: 1}
      ];
    })
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems(prevCartItems => 
      prevCartItems.reduce((ack, item) =>
        item.id === id
          ? item.amount === 1
            ? ack
            :[...ack, {...item, amount: item.amount - 1}]
          : [...ack, item]
      , [] as CartItemType[])
    );
  };

  if (isLoading) return <LinearProgress />;
  
  if (error) return <div>Something went wrong!</div>

  return (
    <Wrapper>
      <Drawer
        anchor='right'
        open={cartOpened}
        onClose={() => setCartOpened(false)}
      >
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
        />
      </Drawer>
      <StyledButton onClick={() => setCartOpened(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color='error'>
          <ShoppingCart />
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {data?.map((item) => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item
              item={item}
              handleAddToCart={handleAddToCart}
            />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
};

export default App;
