import React from 'react';

import { Product } from '../../../../packages/ui/product/Product';
import { ProductInfo } from '../../../../packages/ui/product-info/productInfo';
import { Quantity } from '../../../../packages/ui/quantity/Quantity';
import { RatingComponent } from '../../../../packages/ui/rating/rating';
import { testData } from '../../../../packages/ui/rating/user-review/test-data';
import UserReview from '../../../../packages/ui/rating/user-review/UserReview';
import { Searchbar } from '../../../../packages/ui/searchbar/searchbar';
import { Checkout } from '../components/auth/Checkout';
export const SampleView = () => {
  return (
    <main>
      <section>
        <div>
          <ProductInfo />
        </div>
      </section>
    </main>
  );
};
