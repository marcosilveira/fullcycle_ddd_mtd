import { Model, Table, PrimaryKey, Column, ForeignKey, BelongsTo } from 'sequelize-typescript';
import OrderModel from './order.model';
import ProductModel from '../../../product/repository/sequilize/product.model';

@Table({
    tableName: "orders_items",
    timestamps: false,
})
export default class OrderItemModel extends Model {
    @PrimaryKey
    @Column
    declare id: string;

    // recupera apenas o id
    @ForeignKey(() => ProductModel)
    @Column({ allowNull: false })
    declare product_id: string;

    // recupera todos os dados
    @BelongsTo(() => ProductModel)
    declare product: ProductModel;

    // recupera apenas o id
    @ForeignKey(() => OrderModel)
    @Column({ allowNull: false })
    declare order_id: string;

    // recupera todos os dados
    @BelongsTo(() => OrderModel)
    declare order: OrderModel;


    @Column({ allowNull: false })
    declare quantity: number;

    @Column({ allowNull: false })
    declare name: string;

    @Column({ allowNull: false })
    declare price: number;


}