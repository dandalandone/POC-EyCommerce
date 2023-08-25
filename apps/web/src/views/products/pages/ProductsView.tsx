import { Flex, Grid, Title } from '@mantine/core';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from 'ui/product/Product';
import { Searchbar } from 'ui/searchbar/searchbar';

import { useGetAllProducts } from '../api';
import { StyledContainer } from './styles';

export const ProductsView = () => {
  const productQuery = useGetAllProducts({});
  const navigate = useNavigate();
  if (productQuery.isLoading) {
    return <h1>...Loading</h1>;
  }

  if (!productQuery?.data?.length) {
    return <h1>No Product</h1>;
  }

  if (!productQuery.data) return <h1>error</h1>;

  return (
    <main>
      <StyledContainer fluid>
        <Flex justify="center" align="center" gap="xs">
          <Title order={1} weight={600} align="center">
            EY
          </Title>
          <Title order={1} weight={200} align="center">
            Store
          </Title>
        </Flex>

        <Searchbar />
        <Grid>
          {productQuery.data.map((data, index) => {
            if (data.isActive && data.productInventory > 0) {
              return (
                <Grid.Col sm={4} md={3} lg={2.4} key={data._id}>
                  <Product
                    img={data.productImg[0]}
                    name={data.productName}
                    price={data.productPrice}
                    onClick={() => navigate(`/products/${data._id}`)}
                  ></Product>
                </Grid.Col>
              );
            } else {
              return null;
            }
          })}
        </Grid>
      </StyledContainer>
    </main>
  );
};
