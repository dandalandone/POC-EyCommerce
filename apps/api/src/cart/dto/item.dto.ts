import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ImageDto } from 'src/products/dto/create-product.dto';

export class ItemDto {
  @IsNotEmpty()
  @IsString()
  productID: string;

  @IsNotEmpty()
  @IsString()
  productName: string;

  @IsNotEmpty()
  productImg: ImageDto;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  productPrice: number;

  productInventory: number;
}
