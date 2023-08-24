import { Button, DEFAULT_THEME, Grid, Image, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useState } from 'react';
import { TiTrash } from 'react-icons/ti';

import { Cart, OrderedItems } from '../../../apps/web/src/views/cart/types';
import { Quantity } from '../quantity/Quantity';
import { StyledScrollArea, StyledTable } from './styles';

// interface ICartItem {
//   id: number;
//   imageSrc: string;
//   merchant: string;
//   productName: string;
//   price: number;
//   quantity: number;
// }

interface ICartProps {
  item: OrderedItems;
  onQuantityChange: (newQuantity: number) => void;
}

interface Props {
  data: Cart;
}

const CartTable = ({ data: { orderedItems } }: Props) => {
  const [cartItems, setCartItems] = useState(orderedItems);

  const calculateSubtotal = (items: OrderedItems[]) => {
    return items.reduce(
      (total, item) => total + item.productPrice * item.quantity,
      0,
    );
  };

  const handleCartItemQuantityChange = (
    itemId: string,
    newQuantity: number,
  ) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.productID === itemId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    setCartItems(updatedCartItems);
    const newSubtotal = calculateSubtotal(updatedCartItems);
  };

  const web = useMediaQuery(`(min-width: ${DEFAULT_THEME.breakpoints.sm})`);
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );
  const subtotal = calculateSubtotal(cartItems);

  //mock data only
  const totalPrice = 4;

  const formattedTotal = totalPrice.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <StyledScrollArea>
      {web ? (
        <StyledTable fontSize="md">
          <thead>
            <tr>
              <th colSpan={2}>
                <Text fz="xl" fw={700}>
                  Cart
                </Text>
              </th>
              <th>
                <Text fz="md" fw={100}>
                  Product Price
                </Text>
              </th>
              <th>
                <Text fz="md" fw={100}>
                  Quantity
                </Text>
              </th>
              <th>
                <Text fz="md" fw={100}>
                  Total Price
                </Text>
              </th>
              <th>
                <Text fz="md" fw={100}>
                  Action
                </Text>
              </th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <CartRow
                key={index}
                item={item}
                onQuantityChange={(newQuantity: number) =>
                  handleCartItemQuantityChange(item.productID, newQuantity)
                }
              />
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th
                colSpan={5}
                style={{ textAlign: 'right', alignItems: 'center' }}
              >
                <Text
                  fz="sm"
                  fw={100}
                  color="black"
                  style={{ display: 'inline-block', marginLeft: '10px' }}
                >
                  Total ({totalItems} items):
                </Text>{' '}
                <Text fz="sm" fw={700} style={{ display: 'inline-block' }}>
                  &#8369;{formattedTotal}
                </Text>
              </th>
              <th colSpan={1} style={{ paddingRight: '50px' }}>
                <Button
                  fz="md"
                  style={{
                    color: 'black',
                    alignItems: 'center',
                    marginTop: 0,
                  }}
                >
                  Checkout
                </Button>
              </th>
            </tr>
          </tfoot>
        </StyledTable>
      ) : (
        <StyledTable>
          <thead>
            <tr>
              <th colSpan={2}>
                <Text fz="md" fw={700}>
                  Cart
                </Text>
              </th>
              <th></th>
              <th>
                <Text fz="sm" fw={100}>
                  Total Price
                </Text>
              </th>
            </tr>
          </thead>

          <tbody>
            {cartItems.map((item, index) => (
              <CartRow
                key={index}
                item={item}
                onQuantityChange={(newQuantity: number) =>
                  handleCartItemQuantityChange(item.productID, newQuantity)
                }
              />
            ))}
          </tbody>
        </StyledTable>
      )}
    </StyledScrollArea>
  );
};

const CartRow: React.FC<ICartProps> = ({ item, onQuantityChange }) => {
  const web = useMediaQuery(`(min-width: ${DEFAULT_THEME.breakpoints.sm})`);

  return (
    <>
      {web ? (
        <>
          <tr key={item.productID}>
            <td>
              <Image
                width={120}
                height={120}
                src={item?.productImg?.ImgURL}
                alt="With default placeholder"
                withPlaceholder
              />
            </td>
            <td className="col-two">
              <Text align="start">{item.productName}</Text>
            </td>
            <td>₱{item.productPrice.toFixed(2)}</td>
            <td>
              <Quantity
                quantity={item.quantity}
                onQuantityChange={(newQuantity) => {
                  onQuantityChange(newQuantity);
                }}
              />
            </td>
            <td>
              <Text fz="xl" fw={700} c="brand">
                ₱{(item.quantity * item.productPrice).toFixed(2)}
              </Text>
            </td>
            <td>
              <TiTrash color="red" size={40} />
            </td>
          </tr>
        </>
      ) : (
        <>
          <tr key={item.productID}>
            <td className="col-two">
              <Text fz="xs" align="start">
                {item.productName}
              </Text>
              <Image
                width={75}
                height={75}
                src={item?.productImg?.ImgURL}
                alt="With default placeholder"
                withPlaceholder
              />
            </td>
            <td>
              <Text fz="xs">₱{item.productPrice.toFixed(2)}</Text>
            </td>
            <td>
              <Quantity
                quantity={item.quantity}
                onQuantityChange={(newQuantity) => {
                  onQuantityChange(newQuantity);
                }}
              />
            </td>
            <td>
              <Grid>
                <Grid.Col span={8}>
                  <Text fz="xs" fw={700} c="brand">
                    ₱{(item.quantity * item.productPrice).toFixed(2)}
                  </Text>
                </Grid.Col>
                <Grid.Col span={4}>
                  <TiTrash color="red" size={14} />
                </Grid.Col>
              </Grid>
            </td>
          </tr>
        </>
      )}
    </>
  );
};

export default CartTable;
