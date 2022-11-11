
import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository.interfaces";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";

export default class OrderRepository  implements OrderRepositoryInterface{
    async create(entity: Order): Promise<void> {
        await OrderModel.create({
            id: entity.id,
            customer_id: entity.customerId,
            total: entity.total(),
            items: entity.items.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                product_id: item.productId,
                quantity: item.quantity,
            }))
        },
        {
            include: [{model: OrderItemModel}],
        }
        );
    }
    
    async update(entity: Order): Promise<void> {
        await OrderItemModel.destroy({
            where: { order_id: entity.id},
        });
        const items = entity.items.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            product_id: item.productId,
            quantity: item.quantity,
            order_id: entity.id
        })
        );
        await OrderItemModel.bulkCreate(items);
        await OrderModel.update(
        {
            total: entity.total(),
        },
        {
            where: {
                id: entity.id,
            }
        
        }
        );
    }
   
    async find(id: string): Promise<Order> {
        let orderModel;
        try {
            orderModel = await OrderModel.findOne({
                where: { id, },
                rejectOnEmpty: true,
                include: ["items"],
            });
        } catch (error) {
            throw new Error("Order not found");
        }
        let orderItems = orderModel.items.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            product_id: item.product_id,
            quantity: item.quantity,
        })) as unknown as OrderItem[];
        return new Order(orderModel.id, orderModel.customer_id, orderItems);
    }
    
    async findAll(): Promise<Order[]> {
        const ordersModel = await OrderModel.findAll({include: ["items"]});
        let orders = ordersModel.map((order) => ({
            id: order.id,
            customer_id: order.customer_id,
            items: order.items.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                product_id: item.product_id,
                quantity: item.quantity,
            })) as unknown as OrderItem[],
            total: order.total,
        })) as unknown as Order[];
        return orders;
    }


}