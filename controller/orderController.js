import Order from "../models/orderModel";

const createOrder = async (req, res) => {
    try {
        const {
            userId,
            cartId,
            totalOrderPrice,
            shippingAddress,
            paymentMethod,
            transactionId
        } = req.body;

        const order = new Order({
            userId,
            cartId,
            totalOrderPrice,
            shippingAddress,
            paymentMethod,
            transactionId,
            orderStatus: "Pending" 
        });

        await order.validate();

        await order.save();

        res.status(200).json(order);
    } catch (error) {
            res.status(422).json({ message: error.message });
        } 
    
};

export default createOrder; 

