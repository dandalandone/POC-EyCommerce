import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsStrongPassword,
  MinLength,
  Matches,
  IsIn,
  ValidateNested,
  IsNumber,
} from 'class-validator';
import { AddressHasLeadingTrailingSpaces, isPhoneNumberWithTrim } from 'src/utils/custom-validations.utils';

class Address {
  @IsNotEmpty()
  @IsString()
  @AddressHasLeadingTrailingSpaces()
  street: string;

  @IsNotEmpty()
  @IsString()
  @AddressHasLeadingTrailingSpaces()
  city: string;

  @IsNotEmpty()
  @IsString()
  @AddressHasLeadingTrailingSpaces()
  region: string;

  @IsNotEmpty()
  @IsNumber()
  zipcode: string;

  @IsNotEmpty()
  @IsString()
  @AddressHasLeadingTrailingSpaces()
  country: string;
}

export class CreateMerchantDto {
  @IsNotEmpty()
  @IsString()
  @IsIn(['merchant', 'consumer'], {
    message: 'Invalid User Type. Allowed values: "consumer" or "merchant".',
  })
  readonly userType: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[A-Za-z0-9]+$/, {
    message: 'Username must contain only alphanumeric characters and no spaces.',
  })
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  @Matches(
    /^(?! )[A-Za-z0-9!@#$%^&*()_+\-=[\]{}|\\;:'",.<>/`~]+(?: [A-Za-z0-9!@#$%^&*()_+\-=[\]{}|\\;:'",.<>/`~]+)*(?<! )$/,
    {
      message: 'Merchant name must contain only alphanumeric characters and cannot have leading or trailing spaces',
    },
  )
  readonly merchantName: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  @MinLength(8, {
    message: 'Password should be atleast 8 characters',
  })
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[A-Za-z]+(?: [A-Za-z]+)*$/, {
    message: 'First name must contain only alphabetic characters and cannot have leading or trailing spaces',
  })
  readonly firstName: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[A-Za-z]+(?: [A-Za-z]+)*$/, {
    message: 'Last name must contain only alphabetic characters and cannot have leading or trailing spaces',
  })
  readonly lastName: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Address)
  readonly address: Address;

  @IsNotEmpty()
  @isPhoneNumberWithTrim()
  phoneNumber: string;
}
