import { IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  public Name: string;

  @IsNumber()
  public WQty: number;

  @IsNumber()
  public SRate: number;

  @IsString()
  public Category: string;
}
