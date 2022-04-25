import { IOrders } from './IOrders';

export class Orders implements IOrders
{
  public orderId!: number;
  public product!: string;
  public seller!: number;
  public country!: string;
  public price!: number;
}
