import { Model, Table, PrimaryKey, Column, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import CustomerModel from '../../../customer/repository/sequilize/customer.model';
import OrderItemModel from './order-item.model';

@Table({
    tableName: "orders",
    timestamps: false,
})
export default class OrderModel extends Model {
    @PrimaryKey
    @Column
    declare id: string;

    // recupera apenas o id do cliente
    @ForeignKey(() => CustomerModel)
    @Column({ allowNull: false })
    declare customer_id: string;

    // recupera todo os dados do cliente
    @BelongsTo(() => CustomerModel)
    declare customer: CustomerModel;

    // relaciona muitos itens que podem ter na order
    @HasMany(() => OrderItemModel)
    declare items: OrderItemModel[];

    @Column({ allowNull: false })
    declare total: number;


}