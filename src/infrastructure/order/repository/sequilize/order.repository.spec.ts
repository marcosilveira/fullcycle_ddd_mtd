import {Sequelize} from 'sequelize-typescript';
import Order from '../../../../domain/checkout/entity/order';
import OrderItem from '../../../../domain/checkout/entity/order_item';
import Customer from '../../../../domain/customer/entity/custumer';
import Address from '../../../../domain/customer/value-object/address';
import Product from '../../../../domain/product/entity/product';
import CustomerModel from '../../../customer/repository/sequilize/customer.model';
import ProductModel from '../../../product/repository/sequilize/product.model';
import CustomerRepository from '../../../customer/repository/sequilize/customer.repository';
import OrderRepository from './order.repository';
import OrderModel from './order.model';
import OrderItemModel from './order-item.model';
import ProductRepository from '../../../product/repository/sequilize/product.repository';



describe("Order repository test", () => {
    let sequelize: Sequelize;
    
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a new order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.Address = address;
        await customerRepository.create(customer);
        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 10);
        await productRepository.create(product);
        const orderItem = new OrderItem("1", product.name, product.price, product.id, 2);
        const order = new Order("123", "123", [orderItem]);
        const orderRepository = new OrderRepository();
        await orderRepository.create(order);
        const orderModel = await OrderModel.findOne({ 
            where: { id: order.id },
            include: ["items"],
        });
        expect(orderModel.toJSON()).toStrictEqual({
            id: "123",
            customer_id: "123",
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    order_id: "123",
                    product_id: "123",
                },
            ],
        })
    });

    it("Should update a order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.Address = address;
        await customerRepository.create(customer);
        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 10);
        await productRepository.create(product);
        const orderItem = new OrderItem("1", product.name, product.price, product.id, 2);
        let order = new Order("123", "123", [orderItem]);
        const orderRepository = new OrderRepository();
        await orderRepository.create(order);
        const product2 = new Product("456", "Product 2", 20);
        await productRepository.create(product2);
        const orderItem2 = new OrderItem("2", product2.name, product2.price, product2.id, 4);
        order = new Order("123", "123", [orderItem, orderItem2]);
        await orderRepository.update(order);
        const orderModel = await OrderModel.findOne({ 
            where: { id: order.id },
            include: ["items"],
        });
        expect(orderModel.toJSON()).toStrictEqual({
            id: order.id,
            customer_id: order.customerId,
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    product_id: product.id,
                    quantity: orderItem.quantity,
                    order_id: order.id
                },
                {
                    id: orderItem2.id,
                    name: orderItem2.name,
                    price: orderItem2.price,
                    product_id: product2.id,
                    quantity: orderItem2.quantity,
                    order_id: order.id
                },
            ],
        })
    });

    it("Should find a order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.Address = address;
        await customerRepository.create(customer);
        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 10);
        await productRepository.create(product);
        const orderItem = new OrderItem("1", product.name, product.price, product.id, 2);
        const order = new Order("123", "123", [orderItem]);
        const orderRepository = new OrderRepository();
        await orderRepository.create(order);
        const orderModel = await OrderModel.findOne({ where: {id: "123" }, include: ["items"], });
        const foundOrderModel = await orderRepository.find("123");
        expect(orderModel.toJSON()).toStrictEqual({
            id: foundOrderModel.id,
            customer_id: foundOrderModel.customerId,
            total: foundOrderModel.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    order_id: foundOrderModel.id,
                    product_id: product.id,
                },
            ],
        });

    });

    it("Should find all orders", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.Address = address;
        await customerRepository.create(customer);
        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 10);
        await productRepository.create(product);
        const orderItem = new OrderItem("1", product.name, product.price, product.id, 2);
        const order = new Order("123", "123", [orderItem]);

        const customerRepository2 = new CustomerRepository();
        const customer2 = new Customer("567", "Customer 2");
        const address2 = new Address("Street 2", 2, "Zipcode 2", "City 2");
        customer2.Address = address2;
        await customerRepository2.create(customer2);
        const productRepository2 = new ProductRepository();
        const product2 = new Product("456", "Product 2", 20);
        await productRepository2.create(product2);
        const orderItem2 = new OrderItem("2", product2.name, product2.price, product2.id, 4);
        const order2 = new Order("546", "123", [orderItem2]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order);
        await orderRepository.create(order2);

        const orders = await orderRepository.findAll();
        expect(orders).toHaveLength(2);
        expect(orders).toStrictEqual([
            {
                id: order.id,
                customer_id: order.customerId,
                total: order.total(),
                items: [
                    {
                        id: orderItem.id,
                        name: orderItem.name,
                        price: orderItem.price,
                        product_id: product.id,
                        quantity: orderItem.quantity,
                    }
                ]
            },
            {
                id: order2.id,
                customer_id: order2.customerId,
                total: order2.total(),
                items: [
                    {
                        id: orderItem2.id,
                        name: orderItem2.name,
                        price: orderItem2.price,
                        product_id: product2.id,
                        quantity: orderItem2.quantity,
                    }
                ]
            }

        ]);

    });


});